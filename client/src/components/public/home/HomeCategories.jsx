import { useSelector } from "react-redux"

const HomeCategories = () => {
    const { categories } = useSelector(state => state.utils)
    const parent_categories = categories && categories.filter(item => item.parent === "None");
  
  return (
    <div className="home-categories">
             <div className="inner-row-2">
                        <div className="home-categories-content">
                                    <h2 className="section-title">Explore Popular Categories</h2>

                                    <div className="categories-wrap-row">
                                              { categories && parent_categories.map(category => 
                                                     <div className="category-moja" key={category._id}>
                                                                 <img src={category.thumbnail} alt="" />
                                                                 <h3>{category.name}</h3>
                                                     </div>
                                              )}
                                    </div>
                        </div>
             </div>
    </div>
  )
}

export default HomeCategories