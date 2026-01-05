'use client'

import { useEffect } from 'react'
import Slider from './Slider'
import styles from './CategoryNav.module.css'

export default function CategoryNav() {
  // Commented out from original Vue component
  // const [selected, setSelected] = useState("hot")
  // const [isSearch, setIsSearch] = useState(false)
  // const [gameCategories, setGameCategories] = useState([])
  // const scrollContainerRef = useRef(null)
  // const scrollIndicatorRef = useRef(null)

  const fetchGamesCategories = async () => {
    // Commented out from original Vue component
    // const response = await store.dispatch("getGamesCategories")
    // setGameCategories(response)
  }

  // Commented out from original Vue component
  /*
  const trigger = (params: string) => {
    setIsSearch(false)
    setSelected(params)
    params === "hot"
      ? router.push("/hot")
      : router.push(`/category/${params}`)
  }

  const isActive = (value: string) => {
    if (value === "hot" && !router.query.name) {
      return true
    } else {
      return value === router.query.name
    }
  }

  const moveScrollIndicator = () => {
    if (scrollContainerRef.current && scrollIndicatorRef.current) {
      const scrollContainer = scrollContainerRef.current
      const scrollIndicatorElt = scrollIndicatorRef.current
      let scrollWidth = scrollContainer.scrollWidth
      let offsetWidth = scrollContainer.offsetWidth
      let contentWidth = scrollWidth - offsetWidth
      const percentage = (scrollContainer.scrollLeft / contentWidth) * 100
      if (percentage > 50) scrollIndicatorElt.style.width = percentage + "%"
    }
  }
  */

  useEffect(() => {
    fetchGamesCategories()
  }, [])

  return (
    <div className="container text-center mx-auto" style={{ maxWidth: '1140px' }}>
      <div>
        <Slider />
      </div>

      {/* @deprecated. We now display only ShacksEvo games */}
      {/*
      <div className={styles.categories} id="scrollContainer" onScroll={moveScrollIndicator}>
        {gameCategories.map((item, index) => (
          <div
            key={index}
            className={`${styles.categoryItem} ${isActive(item.value) && !isSearch ? styles.active : ''}`}
            onClick={() => trigger(item.value)}
          >
            {index === item.position && <p>{item.name}</p>}
          </div>
        ))}
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} id="scrollIndicator"></div>
      </div>
      */}
    </div>
  )
} 