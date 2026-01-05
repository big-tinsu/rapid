"use client";
import styles from "./index.module.css";
import { PromotionItem } from "./promotion-item";
import { formatCurrency } from "@/utils/currency";
import classNames from "classnames";
export function Promotions() {
  return (
    <div className="min-h-screen">
      <div className={styles["promotions-holder"]}>
        <h3 className={classNames(styles["promotions-header"], "text-white text-xl font-bold")}>
          Promotions
        </h3>

        <div className={styles["promotions"]}>
          <PromotionItem
            title="10% DAILY CASHBACKS"
            subtitle="13/04/2023"
            image="/assets/images/promotions/promotion.jpg"
            collapsedText="Get 10% cashbacks on all your losses daily on Onerapidplay. Whatever you loose as a bet stake, you get 10% of it back the following day in your promo wallet. This has NO waggering requirement and you can withdraw the money straight into your bank account. NO WACKY terms and conditions."
          >
            <div className="flex flex-col gap-3">
              <p>
                Get 10% cashbacks on all your losses daily on Onerapidplay.
                Whatever you loose as a bet stake, you get 10% of it back the
                following day in your promo wallet. This has NO waggering
                requirement and you can withdraw the money straight into your
                bank account. NO WACKY terms and conditions.
              </p>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">BREAKDOWN:</h3>

                <div className="flex flex-col gap-1">
                  <p>- Get 10% real CASH BACK.</p>
                  <p>- No limits on cashback amount.</p>
                  <p>- No wager requirement.</p>
                  <p>- You can withdraw to your bank account.</p>
                  <p>
                    - Cashback expire every 24 hours from the date of issue if
                    unused.
                  </p>
                  <p>
                    - We reserve the right to confiscate winnings if we suspect
                    a player has multiple accounts.
                  </p>
                  <p>
                    - Onerapidplay Casino general Terms and Conditions apply.
                  </p>
                </div>
              </div>
            </div>
          </PromotionItem>

          <PromotionItem
            image="/assets/images/promotions/promotion.jpg"
            title="Free Daily Spins"
            subtitle="13/04/2023"
            collapsedText="Join Onerapidplay Casino and enjoy FREE daily spins on the Fortune Wheel. NO unfair tricks!"
          >
            <div className="flex flex-col gap-3">
              <p>
                Join Onerapidplay Casino and enjoy FREE daily spins on the
                Fortune Wheel. NO unfair tricks!
              </p>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">How to get your Free Spins:</h3>

                <div className="flex flex-col gap-1">
                  <p>- Join Onerapidplay today.</p>
                  <p>
                    - Make a first deposit of at least
                    {formatCurrency(500)}.
                  </p>
                  <p>- Get Free Spins immediately!</p>
                  <p>- You can only spin once per day.</p>
                  <p>- Spin everyday if you like.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">BREAKDOWN:</h3>

                <div className="flex flex-col gap-1">
                  <p>- Get daily FREE spins.</p>
                  <p>
                    - You will find the Free Spin icon when you click on the
                    dropdown icon at the top right.
                  </p>
                  <p>- Amount won is sent to your promo wallet.</p>
                  <p>- No wager requirement.</p>
                  <p>
                    - Free spin amount expires every 24 hours from the date of
                    issue if unused.
                  </p>

                  <p>
                    - We reserve the right to confiscate winnings if we suspect
                    a player has multiple accounts.
                  </p>

                  <p>
                    - Onerapidplay Casino general Terms and Conditions apply.
                  </p>
                </div>
              </div>
            </div>
          </PromotionItem>
        </div>
      </div>
    </div>
  );
}
