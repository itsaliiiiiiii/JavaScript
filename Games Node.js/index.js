#!/usr/bin/env node 

const https = require('https');
const readline = require('readline');


function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';


            if (res.statusCode >= 400) {
                res.resume();
                return reject(new Error(`Request failed with status ${res.statusCode}`));
            }


            res.on('data', chunk => data += chunk);


            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

function pickRandom(array, n) {
    const copy = array.slice();
    const result = [];

    for (let i = 0; i < n && copy.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }

    return result;
}


async function getPokemonData(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`;
    return fetchJSON(url);
}

async function getMoveData(url) {
    return fetchJSON(url);
}

async function getMoves(pokemonData) {
    const allMoves = pokemonData.moves.map(m => m.move);
    const randomMoves = pickRandom(allMoves, 15);
    const finalMoves = [];

    for (const move of randomMoves) {
        if (finalMoves.length >= 5) break;

        const data = await getMoveData(move.url);
        if (data.power) {
            finalMoves.push({
                name: data.name,
                power: data.power,
                accuracy: data.accuracy || 100
            });
        }
    }

    return finalMoves;
}


function doesHit(accuracy) {
    const roll = Math.random() * 100;
    return roll <= accuracy;
}


async function main() {
    console.log('==============================');
    console.log('Welcome to Pokémon Battle Game!');
    console.log('Both you and the bot start with 300 HP.');
    console.log('==============================\n');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise(res => rl.question(q, ans => res(ans.trim())));

    let allPokemon;
    try {
        allPokemon = await fetchJSON('https://pokeapi.co/api/v2/pokemon?limit=1000');
    } catch (e) {
        console.log('Could not load Pokémon list.');
        rl.close();
        return;
    }

    let playerName = await ask('Choose your Pokémon (e.g. pikachu, charizard): ');
    if (!playerName) playerName = 'pikachu';

    let playerData;
    playerData = await getPokemonData(playerName);

    const botChoice = pickRandom(allPokemon.results, 1)[0];
    const botData = await getPokemonData(botChoice.name);

    console.log(`\nYou chose: ${playerData.name}`);
    console.log(`Bot chose: ${botData.name}\n`);

    console.log('Loading moves...');
    const playerMoves = await getMoves(playerData);
    const botMoves = await getMoves(botData);

    console.log('\nYour moves:');
    playerMoves.forEach((m, i) => console.log(`${i + 1}. ${m.name} (Power ${m.power}, Accuracy ${m.accuracy})`));
    console.log('\nBattle starts!\n');

    let playerHP = 300;
    let botHP = 300;
    let turn = 1;

    while (playerHP > 0 && botHP > 0) {
        console.log(`\n--- Turn ${turn} ---`);
        console.log(`Your HP: ${playerHP} | Bot HP: ${botHP}`);

        playerMoves.forEach((m, i) => console.log(`${i + 1}. ${m.name}`));
        let moveNum = parseInt(await ask('Choose a move number: '), 10) - 1;

        const move = playerMoves[moveNum];
        console.log(`You used ${move.name}!`);
        if (doesHit(move.accuracy)) {
            const { damage, crit } = move.power;
            botHP = Math.max(0, botHP - damage);
            console.log(`It hit for ${damage} damage`);
        } else {
            console.log('But it missed!');
        }

        if (botHP <= 0) {
            console.log('\nYou win! The bot fainted!');
            break;
        }

        await new Promise(r => setTimeout(r, 700));
        const botMove = pickRandom(botMoves, 1)[0];
        console.log(`\nBot used ${botMove.name}!`);
        if (doesHit(botMove.accuracy)) {
            const { damage, crit } = botMove.power;
            playerHP = Math.max(0, playerHP - damage);
            console.log(`It hit for ${damage} damage`);
        } else {
            console.log('The bot missed!');
        }

        if (playerHP <= 0) {
            console.log('\nYou fainted! The bot wins.');
            break;
        }

        turn++;
    }

    rl.close();
    console.log('\nGame over. Thanks for playing!');
}

main();
