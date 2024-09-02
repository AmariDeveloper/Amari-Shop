import { useContext } from "react"
import SelectedProductBox from "./SelectedProductBox"
import { selectorContext } from "./selectorContext"

const BasketSection = () => {
  // eslint-disable-next-line no-unused-vars
  const [ chosenVariations, setChosenVariations ] = useContext(selectorContext);

  return (
    <div className="basket-section">
              <h3>Selected Variations</h3>
              
               { chosenVariations.products.length > 0 ? 
                      chosenVariations.products.map(vr => <SelectedProductBox data={vr}  key={vr.kitu.id}/>)
                 :
                     <p className="no-product">No products selected</p>
              }

              <div className="basket-action-btn">
                        <button className={ chosenVariations.products.length > 0 ? "btn-active" : ""}>Add to Cart</button>
              </div>
    </div>
  )
}

export default BasketSection