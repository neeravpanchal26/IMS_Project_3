import { saveAs } from 'file-saver';

export const generateSheet = async (data, name) => {
  const Excel = require('exceljs');

  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('Sites');

  const sitesJSON = data.map((x) => { 
    return {
      'Bill Id': x.id,
      'Date': x.date,
      'Site Name': x.siteName,
      'Mpan': x.mpan,
      'From': x.from,
      'To': x.to,
      'Total': x.total,
      'Vat Rate': x.vatRate,
      'Vat': x.vat,
      'Total Including Vat': x.totalIncludingVat,
      'Commodity Charges Total': x.commodityChargesTotal,
      'Network Charges Total': x.networkChargesTotal,
      'Other Charges Total': x.otherChargesTotal,
      'Policy Charge Total': x.policyChargesTotal,
      'CCL Charge Total': x.cclChargesTotal
    };
  });

  sheet.columns = Object.keys(sitesJSON[0]).map((k) => ({ header: k, key: k, width: 30 }));

  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'4673c1'},
    bgColor:{argb:'4673c1'},
  };

  sheet.getRow(1).font = {
    color:{argb: 'FFFFFF'}
  };

  sheet.addRows(sitesJSON);

  const lineItems = workbook.addWorksheet('Line Items');

  var lineItemsJSON = [];
    
  data.forEach((x) => { 
    x.invoiceData.forEach((y) => {
      lineItemsJSON.push({
        'Bill Id': x.id,
        'Date': x.date,
        'Site Name': x.siteName,
        'Mpan': x.mpan,
        'From': x.from,
        'To': x.to,
        'Type': y.type,
        'Quantity': y.quantity,
        'Quantity Unit': y.quantityUnit,
        'Rate': y.rate,
        'Rate Unit': y.rateUnit,
        'Charge': y.charge
      });
    });
  });

  lineItems.columns = Object.keys(lineItemsJSON[0]).map((k) => ({ header: k, key: k, width: 30 }));

  lineItems.getRow(1).fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'4673c1'},
    bgColor:{argb:'4673c1'},
  };

  lineItems.getRow(1).font = {
    color:{argb: 'FFFFFF'}
  };

  lineItems.addRows(lineItemsJSON);

  workbook.xlsx.writeBuffer().then((buf) => {
    saveAs(new Blob([buf]), name + '.xlsx');
  });
};