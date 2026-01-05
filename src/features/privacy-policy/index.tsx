import styles from "./index.module.css";

export function PrivacyPolicy() {
  return (
    <div className="bd-color text-white">
      <div className={styles["privacy-policy"]}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-2xl">PRIVACY POLICY</h1>

          {/* <p className="text-xs">
            Updated on: <span> 20 MARCH 2023</span>
          </p> */}
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Introduction</h3>
          <p>
            Shacks Evolution Limited ("we," "us") is committed to protecting
            your personal data. This policy explains how we collect, use, and
            safeguard your information in compliance with the Nigeria Data
            Protection Act (NDPA) 2023.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Information We Collect</h3>
          <ul>
            <li>
              <strong>Personal Identification:</strong> Name, date of birth,
              address, government-issued ID.
            </li>
            <li>
              <strong>Contact Details:</strong> Phone number, email address.
            </li>
            <li>
              <strong>Financial Data:</strong> Deposit/withdrawal history,
              payment method details (card/bank account/wallet info - stored by
              secure payment processors).
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device type, browser,
              operating system, pages visited.
            </li>
            <li>
              <strong>Gaming Activity:</strong> Bets placed, games played,
              account transactions.
            </li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">How We Use Your Information</h3>
          <ul>
            <li>To create/manage your account (Legal & Contractual Basis).</li>
            <li>To process transactions (Contractual Basis).</li>
            <li>
              To verify identity and prevent fraud (Legal Obligation &
              Legitimate Interest).
            </li>
            <li>
              To comply with regulatory KYC requirements from the Gaming Board
              (Legal Obligation).
            </li>
            <li>To send promotional offers (with your Consent - opt-in).</li>
            <li>To improve our services (Legitimate Interest).</li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Data Sharing and Disclosure</h3>
          <p>
            <strong>Service Providers:</strong> With trusted partners for
            payments, IT support, and security, under strict confidentiality.
          </p>
          <p>
            <strong>Legal Obligations:</strong> If required by law or to protect
            our rights.
          </p>
          <p>
            <strong>We do NOT sell your data.</strong>
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Data Security</h3>
          <p>
            We implement SSL encryption, firewalls, access controls, and
            security protocols to protect your personal information.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Your Data Protection Rights (Under NDPA)</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your data.</li>
            <li>Rectify inaccurate data.</li>
            <li>Request deletion (under certain conditions).</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability.</li>
            <li>Withdraw consent for marketing.</li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Data Retention</h3>
          <p>
            We retain data as long as your account is active and as required by
            law.
          </p>
        </div>
      </div>
    </div>
  );
}
