export default function getTradeStats(trade) {
  var qtyBuys = 0;
  var qtySells = 0;
  var totalBuys = 0;
  var totalSells = 0;
  for (var q in trade.Subtrades) {
    if (trade.Subtrades[q].Type == "BUY") {
      totalBuys = totalBuys + trade.Subtrades[q].Total;
      qtyBuys = qtyBuys + trade.Subtrades[q].Quantity;
    } else {
      totalSells = totalSells + trade.Subtrades[q].Total;
      qtySells = qtySells + trade.Subtrades[q].Quantity;
    }
  }
  var qtyAvailable = qtyBuys - qtySells;
  var actualReturn = totalSells - totalBuys;
  var futureReturn = qtyAvailable * trade.CurrentPrice;
  var totalReturn = actualReturn + futureReturn;
  var totalReturnBtc = totalReturn * trade.FirstPairPrice / trade.BtcPrice;
  var totalReturnUsd = totalReturn * trade.FirstPairPrice;
  var roi = ((futureReturn + totalSells) / totalBuys - 1) * 100;

  var futureReturnBtc = futureReturn * trade.FirstPairPrice / trade.BtcPrice;
  var futureReturnUsd = futureReturn * trade.FirstPairPrice;
  var totalSellsBtc = totalSells * trade.FirstPairPrice / trade.BtcPrice;
  var totalSellsUsd = totalSells * trade.FirstPairPrice;
  var totalBuysBtc = totalBuys * trade.FirstPairPrice / trade.BtcPrice;
  var totalBuysUsd = totalBuys * trade.FirstPairPrice;
  return {
    "QtyAvailable": qtyAvailable,
    "TotalReturn": totalReturn,
    "TotalReturnBtc": totalReturnBtc,
    "TotalReturnUsd": totalReturnUsd,
    "Roi": roi,
    "FutureReturnBtc": futureReturnBtc,
    "FutureReturnUsd": futureReturnUsd,
    "TotalSellsBtc": totalSellsBtc,
    "TotalSellsUsd": totalSellsUsd,
    "TotalBuysBtc": totalBuysBtc,
    "TotalBuysUsd": totalBuysUsd
  }
}
