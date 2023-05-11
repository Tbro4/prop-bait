import Shimano from "../../images/ShimanoSpeedMasterSurf.jpeg";

const ShopHome = ({ products }) => {
  if (!products.length) {
    return <h3>No Products Yet</h3>;
  }
  return (
    <>
      <h3>CURRENT PRODUCTS</h3>

      {products &&
        products.map((product) => (
          <div key={product._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {product.name} <br />
            </h4>

            <img src={require(`../../images/${product.image}`)}></img>

            <div className="card-body bg-light p-2">
              <p>{product.price}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShopHome;
