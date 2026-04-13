import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  read: boolean;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const userId = document
    .querySelector('meta[name="user-id"]')
    ?.getAttribute('content');

  const csrfToken =
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') || '';

  // ✅ Load notifications
  useEffect(() => {
    fetch('/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  // ✅ Real-time listener
  useEffect(() => {
    if (!userId || !(window as any).Echo) return;

    (window as any).Echo
      .private(`notifications.${userId}`)
      .listen(".NewNotification", (e: any) => {
        setNotifications(prev => [
          {
            id: e.id,
            message: e.message,
            read: false,
          },
          ...prev
        ]);
      });

    return () => {
      (window as any).Echo.leave(`notifications.${userId}`);
    };
  }, [userId]);

  // ✅ Mark ONE as read (API + UI)
  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`/notifications/read/${id}`, {
        method: 'POST',
        credentials: 'same-origin', // ✅ VERY IMPORTANT
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json'
        }
      });

      const data = await res.json();
      console.log("SERVER RESPONSE:", data); // 🔍 DEBUG

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );

    } catch (error) {
      console.error("ERROR:", error);
    }
  };
  // ✅ Mark ALL as read (API + UI)
  const markAllAsRead = () => {
    fetch('/notifications/read-all', {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': csrfToken
      }
    });

    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">

      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="w-6 h-6" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📥 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-xl overflow-hidden z-50">

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h4 className="font-semibold text-sm">Notifications</h4>
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Content */}
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm p-4 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`px-4 py-3 text-sm border-b cursor-pointer transition ${n.read ? "bg-white" : "bg-gray-100"
                    }`}
                >
                  {n.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
