
export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <div className="flex py-1 mx-2 my-1 border-b gap-4">
      <div className="w-2/3">
        <time className="text-lg text-gray-500">
          {new Date(createdAt).toLocaleString("en-TH")}
            <div className="text-sm mt-2">
                {rest.name} <br />
                {rest.email} <br />
                {rest.streetAddress} <br />
                {rest.postalCode} <br />
                {rest.country} <br />
            </div>
        </time>
      </div>
      <div className="">
        {line_items.map((item) => (
          <div key={item._id}>
            <span className="text-gray-400">{item.quantity} x </span>
            {item.price_data.product_data.name}
          </div>
        ))}
      </div>
    </div>
  );
}
