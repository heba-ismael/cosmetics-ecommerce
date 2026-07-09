import { useContext, useEffect, useState } from "react";
import {
  MdDashboard,
  MdInventory2,
  MdReceiptLong,
  MdCategory,
} from "react-icons/md";
import { CartContext } from "../../components/Context/CartContext";
import { getAllCategories, getProductsByCategory } from "../../api/api";
import { SITE_CATEGORIES } from "../../constants";
import PageTransition from "../../components/PageTransition";
import toast from "react-hot-toast";
import "./AdminDashboard.css";

const TABS = [
  { id: "overview", label: "Overview", icon: <MdDashboard /> },
  { id: "products", label: "Products", icon: <MdInventory2 /> },
  { id: "orders", label: "Orders", icon: <MdReceiptLong /> },
  { id: "categories", label: "Categories", icon: <MdCategory /> },
];

function AdminDashboard() {
  const { orders } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | Cosmatics";
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, ...productLists] = await Promise.all([
          getAllCategories(),
          ...SITE_CATEGORIES.map((c) => getProductsByCategory(c, 20)),
        ]);
        setCategories(cats.filter((c) => SITE_CATEGORIES.includes(c.slug)));
        setProducts(productLists.flatMap((p) => p.products));
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // This is a visual preview only — there's no backend yet, so these
  // actions just show what the interaction would feel like.
  const notConnected = () =>
    toast.error("Not connected to a database yet — this is a preview only.");

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <PageTransition>
      <div className="admin_page">
        <div className="admin_preview_banner">
          <strong>Preview mode:</strong> this dashboard isn't connected to a
          real database yet. Products come from the demo API (read-only), and
          Orders show your real local orders. Add/Edit/Delete are disabled
          until a backend (like Firebase or Supabase) is connected.
        </div>

        <div className="admin_layout">
          <aside className="admin_sidebar" role="tablist" aria-label="Admin sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          <main className="admin_content">
            {activeTab === "overview" && (
              <div className="admin_overview">
                <h1>Overview</h1>
                <div className="stat_cards">
                  <div className="stat_card">
                    <span className="stat_label">Total Orders</span>
                    <span className="stat_value">{orders.length}</span>
                  </div>
                  <div className="stat_card">
                    <span className="stat_label">Total Revenue</span>
                    <span className="stat_value">
                      ${totalRevenue.toFixed(2)}
                    </span>
                  </div>
                  <div className="stat_card">
                    <span className="stat_label">Products</span>
                    <span className="stat_value">
                      {loading ? "…" : products.length}
                    </span>
                  </div>
                  <div className="stat_card">
                    <span className="stat_label">Categories</span>
                    <span className="stat_value">
                      {loading ? "…" : categories.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="admin_products">
                <div className="admin_section_header">
                  <h1>Products</h1>
                  <button className="btn" onClick={notConnected}>
                    + Add Product
                  </button>
                </div>

                {loading ? (
                  <p>Loading products…</p>
                ) : (
                  <div className="admin_table_wrapper">
                    <table className="admin_table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id}>
                            <td>
                              <img src={p.images?.[0]} alt={p.title} />
                            </td>
                            <td>{p.title}</td>
                            <td>{p.category}</td>
                            <td>${p.price}</td>
                            <td>{p.stock}</td>
                            <td className="admin_row_actions">
                              <button
                                onClick={notConnected}
                                aria-label={`Edit ${p.title}`}
                              >
                                Edit
                              </button>
                              <button
                                className="danger"
                                onClick={notConnected}
                                aria-label={`Delete ${p.title}`}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="admin_orders">
                <h1>Orders</h1>
                {orders.length === 0 ? (
                  <p>No orders placed yet.</p>
                ) : (
                  <div className="admin_table_wrapper">
                    <table className="admin_table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>
                              {new Date(o.date).toLocaleDateString("en-US")}
                            </td>
                            <td>{o.items.length}</td>
                            <td>${o.total.toFixed(2)}</td>
                            <td>
                              <span className="status_pill">{o.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "categories" && (
              <div className="admin_categories">
                <div className="admin_section_header">
                  <h1>Categories</h1>
                  <button className="btn" onClick={notConnected}>
                    + Add Category
                  </button>
                </div>

                {loading ? (
                  <p>Loading categories…</p>
                ) : (
                  <div className="category_cards">
                    {categories.map((cat) => (
                      <div className="category_card" key={cat.slug}>
                        <p>{cat.name}</p>
                        <button onClick={notConnected} aria-label={`Edit ${cat.name}`}>
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </PageTransition>
  );
}

export default AdminDashboard;
