import { Grid } from "@mui/material";
import axios from 'axios';
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../componenets/NavBar";
import PokemonCard from "../componenets/PokemonCard";
import { useEffect } from "react";
import { useState } from "react";
import { Skeletons } from "../componenets/Sleletons";

export const Home = () => {
        const [pokemons, setPokemons] = useState([]);
      useEffect(() => {
         getPokemons()
      }, []);

      const getPokemons = () => {
        var endpoints = []
        
        for(var i = 1; i < 200; i++) {
           endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
         axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
      };

      const pokemonFilter = (name) => {
        var filterPokemons = [];
        if(name==="") {
          getPokemons();
        }
         for (var i in pokemons) {
           if(pokemons[i].data.name.includes(name)) {
              filterPokemons.push(pokemons[i]);
          }
         }
         setPokemons(filterPokemons);
      };

    return (
        <>
          <Navbar pokemonFilter={pokemonFilter}/>
          <Container maxWidth="false">
          <Grid container spacing={2}>
             {pokemons.length === 0 ? <Skeletons/> :
                pokemons.map((pokemon, key) => (
                  <Grid item xs={12} sm={5} md={3} key={key}>
                      <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                  </Grid>
                  ))
             } 
         </Grid>
          </Container>
         
        </>
    )
}