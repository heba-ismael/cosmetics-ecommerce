import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/Context/CartContext";
import PageTransition from "../../components/PageTransition";
import "./Orders.css";

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Orders() {
  const { orders } = useContext(CartContext);

  useEffect(() => {
    document.title = "My Orders | Cosmatics";
  }, []);

  return (
    <PageTransition>
      <div className="orders_page">
        <div className="container">
          <h1>My Orders</h1>

          {orders.length === 0 ? (
            <div className="no_orders">
              <p>You haven't placed any orders yet.</p>
              <Link to="/" className="btn">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="orders_list">
              {orders.map((order) => (
                <div className="order_card" key={order.id}>
                  <div className="order_header">
                    <div>
                      <p className="order_id">{order.id}</p>
                      <p className="order_date">{formatDate(order.date)}</p>
                    </div>
                    <span className="order_status">{order.status}</span>
                  </div>

                  <div className="order_items">
                    {order.items.map((item) => (
                      <div className="order_item" key={item.id}>
                        <img src={item.images?.[0]} alt={item.title} />
                        <div className="order_item_info">
                          <p className="order_item_title">{item.title}</p>
                          <p className="order_item_qty">
                            Qty: {item.quantity} &times; ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order_footer">
                    <span>Total</span>
                    <span className="order_total">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Orders;
