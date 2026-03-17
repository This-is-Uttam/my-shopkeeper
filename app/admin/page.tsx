import Link from "next/link";

export default function AdminDashboardPage() {
  // TEMP dummy stats (will come from API later)
  const stats = [
    { title: "Total Orders", value: "1,248" },
    { title: "Total Revenue", value: "₹12,45,900" },
    { title: "Users", value: "342" },
    { title: "Orders Today", value: "18" },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of MyShopkeeper activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border rounded-lg p-5 shadow-sm"
          >
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/orders"
            className="px-5 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            View Orders
          </Link>

          <Link
            href="/admin/products"
            className="px-5 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900"
          >
            Manage Products
          </Link>

          <Link
            href="/admin/products/add-product"
            className="px-5 py-3 border rounded-md font-medium hover:bg-gray-50"
          >
            Add New Product
          </Link>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {/* TEMP rows */}
              <tr className="border-b">
                <td className="py-3 font-medium">MSK12345</td>
                <td className="py-3">uttam@gmail.com</td>
                <td className="py-3">₹1,299</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                    PLACED
                  </span>
                </td>
                <td className="py-3">10 Feb 2025</td>
              </tr>

              <tr>
                <td className="py-3 font-medium">MSK12344</td>
                <td className="py-3">rahul@gmail.com</td>
                <td className="py-3">₹4,999</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    DELIVERED
                  </span>
                </td>
                <td className="py-3">9 Feb 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
