import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [percentageYearly, setPercentageYearly] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState([]);

  const YEARS = useMemo(() => ["2020", "2021"], []);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        setPercentage((res.data[3].total * 100) / res.data[2].total - 100);
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  useEffect(() => {
    const getIncomeYear = async () => {
      try {
        const res = await userRequest.get("/orders/incomePerYear");
        setYearlyIncome(res.data);
        setPercentageYearly(
          (res.data[1].total * 100) / res.data[0].total - 100
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncomeYear();
  }, []);

  const result = income.reduce(function (tot, arr) {
    return tot + arr.total;
  }, 0);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Prihod ovaj mjesec</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[3]?.total} €</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percentage)}{" "}
            {percentage < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Usporedba sa prethodnim mjesecom</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sveukupni Prihod</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{result} €</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ovogodisnji Prihod</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{yearlyIncome[1]?.total} €</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percentageYearly)}{" "}
            {percentageYearly < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Usporedba sa prethodnom godinom</span>
      </div>
    </div>
  );
}
