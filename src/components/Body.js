import Form from "./Form";
import { useState } from "react";
const Body = ({
  address,
  addFlower,
  flowers,
  buyFlowers,
  sellFlowers,
  increaseQuantity,
}) => {
  const handleQuantity = (flow) => {
    increaseQuantity(flow);
  };
  return (
    <main>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          {/* <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          /> */}
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              alt=""
            />

            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Buy a Flower</h1>

                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Show me How
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              alt=""
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Buy A flower for your loved ones</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="carousel-item">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#777" />
            </svg>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Browse gallery
                  </a>
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Marketing messaging and featurettes
      ================================================== */}
      {/* Wrap the rest of the page in another container to center all the content. */}
      <div className="container marketing">
        {/* Three columns of text below the carousel */}
        <div className="row">
          {flowers.map(
            ({
              id,
              owner,
              name,
              image,
              description,
              quantity,
              price,
              sold,
            }) => (
              <div className="col-lg-4">
                <img
                  style={{ borderRadius: "50%" }}
                  src={image}
                  width={140}
                  height={140}
                  alt=""
                />

                <h2>{name}</h2>
                <p>{description}</p>
                <h4>Quantity: {quantity}</h4>
                <h4>Amount: {price / 10 ** 24} NEAR</h4>
                <div className="">
                  {quantity > 0 && (
                    <p>
                      {!sold ? (
                        <button
                          style={{ width: "100%" }}
                          onClick={() => buyFlowers(id, price)}
                          className="btn btn-primary"
                        >
                          Buy
                        </button>
                      ) : (
                        <button
                          style={{ width: "100%" }}
                          onClick={() => sellFlowers(id)}
                          className="btn btn-danger"
                        >
                          Sell
                        </button>
                      )}
                    </p>
                  )}
                  {owner === address && sold === true && (
                    <p>
                      <button
                        style={{ width: "100%" }}
                        onClick={() => handleQuantity({ id })}
                        className="btn btn-secondary"
                      >
                        Increment Quantity
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        {/* /.row */}
        <Form addFlower={addFlower} />
      </div>
    </main>
  );
};

export default Body;
