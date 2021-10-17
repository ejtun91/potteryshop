import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./sales.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Sijecanj",
      "Veljaca",
      "Ozujak",
      "Travanj",
      "Svibanj",
      "Lipanj",
      "Srpanj",
      "Kolovoz",
      "Rujan",
      "Listopad",
      "Studeni",
      "Prosinac",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (error) {}
    };
    getStats();
  }, []);

  return (
    <div className="sales">
      <FeaturedInfo />
      <Chart data={pStats} dataKey="Sales" title="Prodaja" />
      {/* <div className="salesWidgets">
        <WidgetSm />
        <WidgetLg />
      </div> */}
    </div>
  );
}
