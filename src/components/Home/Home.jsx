import Header from './Header'
import Sponsors from './Sponsors'
import FeaturedProducts from './FeaturedProducts'
import Features from './Features'
import HighlitedProducts from './HighlitedProducts'
import TopCategories from './TopCategories'

function Home() {
  return (
    <div>
      <Header />
      <Features />
      <TopCategories />
      <FeaturedProducts />
      <HighlitedProducts />
      <Sponsors />
    </div>
  )
}

export default Home