import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  )
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPaga] = useState()
  const [loading, setLoading] = useState(true)
  let cancel
  useEffect(() => {
    setLoading(true)
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false)
        setNextPage(res.data.next)
        setPrevPaga(res.data.previous)
        setPokemon(res.data.results.map((p) => p.name))
      })
    return () => cancel()
  }, [currentPageUrl])
  function gotoNextPage() {
    setCurrentPageUrl(nextPage)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPage)
  }
  if (loading) return 'loading ...'
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
      gotoNextPage={ nextPage ?  gotoNextPage : null}
      gotoPrevPage={prevPage ?  gotoPrevPage : null}
      />
    </>
  )
}

export default App
