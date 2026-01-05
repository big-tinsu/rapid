import styles from "./index.module.css";

export function RefundPolicy() {
  return (
    <div className="bd-color text-white">
      <div className={styles["refund-policy"]}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-2xl">REFUND POLICY</h1>

          {/* <p className="text-xs">
            Updated on: <span> 20 MARCH 2023</span>
          </p> */}
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Introduction</h3>
          <p>
            At Onerapidplay.com, we strive for fair and transparent
            transactions. This policy outlines the circumstances under which
            refunds may be considered.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">General Stance</h3>
          <p>
            All placed bets and played games are final. Once a transaction is
            confirmed and the service (betting opportunity/game round) is
            consumed, it is non-refundable.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Technical Errors</h3>
          <p>
            If a proven technical error on our platform occurs (e.g., game
            malfunctions, incorrect odds displayed), we will investigate and, at
            our sole discretion, may void the bet/game and refund the stake to
            your account.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Duplicate/Incorrect Transactions</h3>
          <p>
            If you accidentally make a duplicate deposit or can prove an
            unauthorized transaction from your payment method, contact support
            immediately. We will investigate with our payment providers and may
            refund upon verification.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Failed Withdrawals</h3>
          <p>
            If a withdrawal fails due to an error on our part, we will reprocess
            it once. If it fails due to incorrect details you provided, you are
            responsible for updating them; funds will be returned to your gaming
            account.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Chargebacks</h3>
          <p>
            Initiating a chargeback with your bank without first contacting us
            is a breach of our T&C. It will lead to immediate account closure,
            forfeiture of all winnings, and may result in legal action to
            recover the funds. Always contact support first.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">Self-Exclusion/Responsible Gambling</h3>
          <p>
            If you self-exclude, any remaining balance after the completion of
            all bonus terms will be returned to you via your registered payment
            method.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-xl">How to Request</h3>
          <p>
            All refund requests must be sent to{" "}
            <a
              href="mailto:onerapidplay@shacksevo.co"
              target="_blank"
              className="cursor-pointer text-white no-underline"
            >
              onerapidplay@shacksevo.co
            </a>{" "}
            with the subject "Refund Request" and include your username,
            transaction ID, date, and detailed reason.
          </p>
        </div>
      </div>
    </div>
  );
}
