import styles from '../dashboardPages.module.css';

export default function SettingsPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Account Settings</h1>
        <p className={styles.pageSubtitle}>Manage your notification preferences and account security.</p>
      </header>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Change Password</label>
          <input type="password" className={styles.input} placeholder="New Password" />
        </div>
        <div className={styles.formGroup}>
          <input type="password" className={styles.input} placeholder="Confirm New Password" />
        </div>
        <button className={styles.button} onClick={(e) => e.preventDefault()}>
          Update Password (Disabled)
        </button>
      </div>
    </div>
  );
}