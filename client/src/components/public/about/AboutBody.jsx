import { services } from "../../../data/services"

const AboutBody = () => {
  return (
    <div className="about-body">
             <div className="inner-row">
                       <div className="about-body-content">
                                   <div className="about-body-intro">
                                              <h3>What We Offer You</h3>
                                              <p>We provide a seamless solution for African manufacturers looking to reach international markets. Here&apos;s how we help you succeed:</p>
                                   </div>

                                   <div className="about-body-row">
                                            { services.map(service => 
                                                   <div className="service-moja" key={service.id}>
                                                               <img src={service.icon} className="icon" alt="" />
                                                               <h2>{service.name}</h2>
                                                               <p>{service.description}</p>
                                                   </div>
                                            )}
                                   </div>
                       </div>


                       <div className="about-benefits">
                                    <h2>Why Choose Amari?</h2>

                                    <div className="about-benefits-row">
                                                  {/* <div className="benefit-moja">
                                                             <h3>Access to Global Markets</h3>
                                                             <p>Forget the hassles of logistics. We handle shipping, ensuring that your products get to customers, on time, every time.</p>
                                                  </div> */}
                                                  <div className="benefit-moja">
                                                            <h3>All-in-One Convenience</h3>
                                                            <p>Focus on what you do best - creating quality products. We take care of the rest, from listing to shipping, payments, and customer service.</p>
                                                  </div>
                                                  {/* <div className="benefit-moja">
                                                            <h3>Affordable Subscription</h3>
                                                            <p>Amari provides all these services for a simple monthly subscription fee. No surprise costs - just a clear path to success.</p>
                                                  </div> */}
                                    </div>
                       </div>
             </div>
    </div>
  )
}

export default AboutBody