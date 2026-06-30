import { useParams } from "react-router";
import { getOrderById } from "../Services/order";
import { Calendar, CreditCard, Truck, MapPin, Package } from "lucide-react";

const STATUS_STEPS = ["Confirmed", "Processing", "Shipped", "Delivered"];

const STATUS_BADGE = {
  Processing: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-400",
  },
  Shipped: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  Delivered: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
  Pending: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    dot: "bg-secondary/40",
  },
};

const STEP_INDEX = {
  Confirmed: 0,
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
};

const OrderDetails = () => {
  const { id } = useParams();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center gap-4">
        <Package className="text-6xl text-secondary/30" />
        <p className="text-xl font-medium text-primary">Order not found</p>
        <p className="text-secondary/60 text-sm">
          We couldn't find order #{id}. It may have been removed or the link is
          incorrect.
        </p>
      </div>
    );
  }

  const badge = STATUS_BADGE[order.status] ?? STATUS_BADGE.Pending;
  const stepIndex = STEP_INDEX[order.status] ?? 0;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = order.shipping ?? 0;
  const tax = order.tax ?? 0;
  const total = order.total ?? subtotal + shipping + tax;

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {/* <IoCubeOutline className="text-2xl text-secondary" /> */}
          <Package className="text-2xl text-secondary" />
          <h1 className="text-xl md:text-2xl font-medium text-primary">
            Order #{order.id}
          </h1>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {order.status}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-secondary/10 overflow-hidden">
        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-4 border-b border-secondary/10 text-sm text-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="text-base" />
            {order.date}
          </span>
          {order.paymentMethod && (
            <span className="flex items-center gap-1.5">
              <CreditCard className="text-base" />
              {/* <IoCardOutline className="text-base" /> */}
              {order.paymentMethod}
            </span>
          )}
          {order.trackingNumber && (
            <span className="flex items-center gap-1.5">
              <Truck className="text-base" />
              Tracking:{" "}
              <span className="font-medium text-primary">
                {order.trackingNumber}
              </span>
            </span>
          )}
        </div>

        {/* Shipment progress */}
        {order.status !== "Cancelled" && (
          <div className="px-5 py-5 border-b border-secondary/10">
            <p className="text-xs font-medium uppercase tracking-wider text-secondary/50 mb-4">
              Shipment status
            </p>
            <div className="flex items-start">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={step} className="flex items-start flex-1">
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full border-2 transition-colors ${
                          done
                            ? active
                              ? "bg-brand border-brand ring-4 ring-brand/20"
                              : "bg-green-500 border-green-500"
                            : "bg-white border-secondary/30"
                        }`}
                      />
                      <span
                        className={`text-[10px] text-center leading-tight ${
                          active
                            ? "font-medium text-brand"
                            : done
                              ? "text-secondary"
                              : "text-secondary/40"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mt-1.5 mx-1 transition-colors ${
                          i < stepIndex ? "bg-green-400" : "bg-secondary/15"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {order.estimatedDelivery && (
              <p className="text-xs text-secondary/60 mt-4 flex items-center gap-1.5">
                <Truck className="text-sm" />
                Estimated delivery: {order.estimatedDelivery}
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="px-5 py-5 border-b border-secondary/10">
          <p className="text-xs font-medium uppercase tracking-wider text-secondary/50 mb-3">
            Items ({order.items.length})
          </p>
          <div className="space-y-0 divide-y divide-secondary/8">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover border border-secondary/10 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {item.title}
                  </p>
                  {item.variant && (
                    <p className="text-xs text-secondary/60 mt-0.5">
                      {item.variant}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-secondary/60">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping address */}
        {order.shippingAddress && (
          <div className="px-5 py-5 border-b border-secondary/10">
            <p className="text-xs font-medium uppercase tracking-wider text-secondary/50 mb-2">
              Shipping to
            </p>
            <div className="flex items-start gap-2 text-sm text-secondary">
              <MapPin className="text-base mt-0.5 flex-shrink-0" />
              <span>{order.shippingAddress}</span>
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="px-5 py-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-secondary">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-secondary/10 mt-4 pt-4 flex justify-between items-center">
            <span className="font-medium text-primary">Total</span>
            <span className="text-xl font-semibold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
