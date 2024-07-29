import customers from "../../assets/customers.png"
import sales from "../../assets/sales.png"
import orders from "../../assets/orders.png"
import refunds from "../../assets/refund.png"
import { IoTrendingUp, IoTrendingDown  } from "react-icons/io5";

const SummaryStrip = () => {
  return (
    <div className="summary-wrapper">
    <div className="summary-box">
               <div className="icon">
                         <img src={sales} alt="" />
               </div>
                <span>Total Sales</span>
                <div className="summary-grid">
                         <div className="summary-grid-texts">
                                   <h4><span>Ksh.</span>114,187</h4>
                         </div>
                         <div className="summary-analytics">
                                    <div className="spans">
                                             <span>+3%</span>
                                             <span className="up"><IoTrendingUp /></span>
                                    </div>
                                    <p>This month</p>
                         </div>
                </div>
    </div>
    <div className="summary-box">
               <div className="icon">
                         <img src={customers} alt="" />
               </div>
                <span>Total Customers</span>
                <div className="summary-grid">
                         <div className="summary-grid-texts">
                                   <h4>4,187</h4>
                         </div>
                         <div className="summary-analytics">
                                    <div className="spans">
                                             <span>-13%</span>
                                             <span className="down"><IoTrendingDown /></span>
                                    </div>
                                    <p>This month</p>
                         </div>
                </div>
    </div>
    <div className="summary-box">
               <div className="icon">
                         <img src={orders} alt="" />
               </div>
                <span>Total Orders</span>
                <div className="summary-grid">
                         <div className="summary-grid-texts">
                                   <h4>1,485</h4>
                         </div>
                         <div className="summary-analytics">
                                    <div className="spans">
                                             <span>27%</span>
                                             <span className="up"><IoTrendingUp /></span>
                                    </div>
                                    <p>This month</p>
                         </div>
                </div>
    </div>
    <div className="summary-box">
               <div className="icon">
                         <img src={refunds} alt="" />
               </div>
                <span>Total Refunds</span>
                <div className="summary-grid">
                         <div className="summary-grid-texts">
                                   <h4>403</h4>
                         </div>
                         <div className="summary-analytics">
                                    <div className="spans">
                                             <span>-71%</span>
                                             <span className="down"><IoTrendingDown /></span>
                                    </div>
                                    <p>This month</p>
                         </div>
                </div>
    </div>
</div>
  )
}

export default SummaryStrip