import "@/app/_styles/style.css";
import NavItem from "../_components/NavItem";
import { UserSetting } from "../_components/UserSettingForm";
export const metadata = {
  title: "Account",
};
export default async function AccountPage({ user }) {
  return (
    <main className="main">
      <div className="user-view">
        {/* ---------- Sidebar Navigation ---------- */}
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem href="/account" text="Settings" icon="settings" active />
            <NavItem href="/my-tours" text="My bookings" icon="briefcase" />
            <NavItem href="#" text="My reviews" icon="star" />
            <NavItem href="#" text="Billing" icon="credit-card" />
            <NavItem href="/logout" text="Log out" icon="log-out" />
          </ul>

          {user?.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem href="#" text="Manage tours" icon="map" />
                <NavItem href="#" text="Manage users" icon="users" />
                <NavItem href="#" text="Manage reviews" icon="star" />
                <NavItem href="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>
        <UserSetting user={user} />
      </div>
    </main>
  );
}
