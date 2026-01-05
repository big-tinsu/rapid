import styles from "./index.module.css";

export function TermsAndConditions() {
  return (
    <div className="bd-color text-white">
      <div className={styles["terms-and-conditions"]}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-2xl">TERMS AND CONDITIONS OF USE</h1>

          <p className="text-xs">
            Updated on: <span> 09 DECEMBER 2025</span>
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Introduction</h3>
          <p>
            Welcome to Onerapidplay.com, an online gaming platform operated by
            Shacks Evolution Limited, a company duly registered in Nigeria and
            licensed by the Oyo State Gaming Board. By accessing, registering,
            or using our services, you agree to be bound by these Terms and
            Conditions. Please read them carefully. If you do not agree, you
            must not use our services.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Acceptance of Terms</h3>
          <p>Binding agreement upon registration or use.</p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Eligibility</h3>
          <ul>
            <li>
              You must be at least 18 years old (or the legal age of majority in
              your jurisdiction).
            </li>
            <li>
              You must be a resident in a jurisdiction where using our services
              is legal. We reserve the right to verify your location (via IP
              address) and age.
            </li>
            <li>
              You are personally responsible for complying with your local laws.
            </li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Account Registration</h3>
          <ul>
            <li>
              One account per person. Family, household, or shared device
              members must have individual accounts.
            </li>
            <li>
              You must provide accurate, current, and complete information (KYC:
              Know Your Customer).
            </li>
            <li>
              You are responsible for all activities under your account. Keep
              login details secret.
            </li>
            <li>
              License and Regulations: Acknowledgment that we operate under the
              license and rules of the Oyo State Gaming Board. All games are
              certified for fair play.
            </li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Deposits, Bonuses, and Withdrawals</h3>
          <p>All transactions are in Naira (₦).</p>
          <p>Minimum stake - N200, Maximum stake - N50,000</p>
          <p>Withdrawal amounts: Min - N1000, Max - N1,000,000 daily</p>
          <p>
            Bonus Terms: Bonuses vary based on promotion type (e.g., 30x bonus
            amount), game contributions (game contributions may vary), maximum
            bet limits when using bonus funds (e.g., ₦1,000), and expiry dates
            (e.g., 24 hours). Check the "Promotional Terms" page.
          </p>
          <p>
            Withdrawals are subject to account verification (KYC). Processing
            time is instant for N50,000 and below and 1 hour for N50,001 and
            above.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Prohibited Activities</h3>
          <ul>
            <li>
              Fraud, money laundering, collusion, use of VPNs to bypass
              geo-restrictions, use of bots or automated software.
            </li>
            <li>
              We reserve the right to void bets and confiscate funds from
              accounts involved in fraudulent activity.
            </li>
          </ul>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Responsible Gambling</h3>
          <p>
            We take responsible gambling seriously please visit{" "}
            <a
              href="https://gamblealert.org"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white no-underline"
            >
              gamblealert.org
            </a>{" "}
            if you are having challenges with gambling addiction or need any
            help or support. We monitor your deposit limits, loss limits,
            wagering limits, ensure time-out, self-exclusion.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Limitation of Liability</h3>
          <p>
            1. You agree that your use of the Website and any of the Services is
            at your sole risk.
          </p>
          <p>
            2. The Company does not accept any liability for any damages,
            liabilities or losses of any kind, which are deemed or alleged to
            have arisen out of or in connection with the Website, any of its
            content, the Account and/or any of the Services (including delays or
            interruptions in operation or transmission, communication or lines
            failure, any person's misuse of the Website, the Account and/or the
            Services or any Error). The Company shall not be liable to you in
            contract, tort (including negligence), breach of statutory duty or
            in any other way (arising directly or indirectly) for: loss of
            business, loss of profits, loss of revenue, loss of data, loss of
            opportunity, loss of good will or reputation or any special,
            indirect or consequential loss, arising out of, or in relation to
            your use of the Website, the Services, any activity under the
            Account and these Terms of Use, even if such losses are foreseeable
            or if we have been notified by you of the possibility of such
            losses.
          </p>
          <p>
            3. We will not be liable to you or any third party for any
            modification to, or suspension or discontinuance of the Services or
            any part or component thereof. The Company reserves the right to
            cancel or suspend the Services without any liability whatsoever.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Termination</h3>
          <p>We may suspend or terminate accounts for breach of terms.</p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Amendments</h3>
          <p>We may update these terms; continued use signifies acceptance.</p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Governing Law</h3>
          <p>
            These terms are governed by the laws of the Federal Republic of
            Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
}
