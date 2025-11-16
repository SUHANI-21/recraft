import styles from '../dashboardPages.module.css';

// Conversion rate for simulation
const INR_CONVERSION_RATE = 83.5;

// Enriched sample order data
const sampleOrders = [
  { 
    id: 'REC1003', 
    date: '2025-10-28', 
    status: 'Delivered', 
    items: [
      { name: 'Upcycled Denim Tote Bag', artisan: 'EcoCrafts by Jane', priceUSD: 45.00 }
    ]
  },
  { 
    id: 'REC1002', 
    date: '2025-09-15', 
    status: 'Delivered', 
    items: [
      { name: 'Plastic Waste Wall Clock', artisan: 'Plasticity Designs', priceUSD: 75.00 }
    ]
  },
  { 
    id: 'REC1001', 
    date: '2025-08-01', 
    status: 'Delivered', 
    items: [
      { name: 'Newspaper Woven Basket', artisan: 'EcoCrafts by Jane', priceUSD: 35.00 }
    ]
  },
];

export default function OrderHistoryPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Order History</h1>
        <p className={styles.pageSubtitle}>View the status and details of your past orders.</p>
      </header>
      
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Details</th>
            <th>Total (INR)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map(order => {
            // Calculate total for the order
            const totalUSD = order.items.reduce((sum, item) => sum + item.priceUSD, 0);
            const totalINR = totalUSD * INR_CONVERSION_RATE;

            return (
              <tr key={order.id}>
                <td>{order.id}<br/><small>{order.date}</small></td>
                <td>
                  {order.items.map(item => (
                    <div key={item.name} style={{ marginBottom: '0.5rem' }}>
                      <strong>{item.name}</strong>
                      <br />
                      <small>by {item.artisan}</small>
                    </div>
                  ))}
                </td>
                <td>₹{totalINR.toFixed(2)}</td>
                <td>
                  <span className={`${styles.status} ${order.status === 'Delivered' ? styles.statusDelivered : ''}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}