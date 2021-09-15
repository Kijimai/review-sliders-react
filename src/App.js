import React, { useState, useEffect } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { FaQuoteRight } from "react-icons/fa"
import data from "./data"
function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  //runs if the index or people array gets re-rendered
  useEffect(() => {
    const lastIndex = people.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    } else if (index > people.length - 1) {
      setIndex(0)
    }
  }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 5000)
    return () => clearInterval(slider)
  }, [index])

  return (
    <div>
      <header className="title">
        <h2>
          <span>/</span> Reviews
        </h2>
      </header>
      <section className="section-center">
        {people.map((person, personIndex) => {
          const { id, name, image, title, quote } = person
          let position = "nextSlide"
          if (personIndex === index) {
            position = "activeSlide"
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide"
          }

          return (
            <article className={position} key={id}>
              <img src={image} className="person-img" alt={name} />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          )
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </section>
    </div>
  )
}

export default App
