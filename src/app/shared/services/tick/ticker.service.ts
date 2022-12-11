import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransactionSlipComponent } from '../../dialogs/transaction-slip/transaction-slip.component';
import { DailyTicksModel, MonthlyTicksModel, PaymentTicksModel, YearlyTicksModel } from '../../models/contributor-model/contributor-model';
 
interface ITickResponse {
  status: 0 | 1;
  result?: MonthlyTicksModel;
  msg: string;
}

interface ITickDrawOptions {
  year: number;
  month: number;
  tickContainer: HTMLDivElement,
  paymentTicks: PaymentTicksModel,
}

@Injectable({
  providedIn: 'root'
})
export class TickerService {
  nodeValue = "ticks";
  constructor(
    private dialog: MatDialog
  ) {
   }
 
  lastDayOfMonth(year: number, month: number): number {
    // month starts from 0
    return new Date(year, month, 0).getDate();
  }

  drawTick(options: ITickDrawOptions) {
    let tH = this.tickHost(options.tickContainer);
    
    let start = 1;
    let end = new Date(options.year,options.month, 0).getDate();
    
    let ds = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

    // fetch ticks for the given month and year provided
    this.getMonthTicksFor(options.paymentTicks,{year: options.year, month: options.month}).then( res => {
      for(let start = 1; start <= end; start++) {
        let date = new Date(`${options.month}/${start}/${options.year}`);
        let dName = ds[date.getDay()];
        let t = this.tickCard({day: {name: dName, num: start}, element: tH});

        // store daily ticks
        let ticked: Array<DailyTicksModel>;
        if(res.status == 1) {
          ticked = res.result!!.dailyTicks.filter(t => t.id == start);
        } else {
          ticked = []
        }
 
        if(ticked.length > 0) {
          // change the styling to indicate ticked (add event listener)
          t.style.border = '1px solid rgb(102, 192, 102)';
          t.addEventListener('click', () => {
            const config = new MatDialogConfig();
            config.disableClose = false;
            config.autoFocus = true;
            config.height = '36em';
            config.width = '29em';
            config.data = {transaction_id: ticked[0].transaction_id}

            this.dialog.open(TransactionSlipComponent, config);
          });
          
        } else {
          // change the styling to indicate passed but not ticked
          let tday = new Date();
          if((tday.getMonth() <= options.month) && (start < tday.getDate())) {
            t.style.border = '1px solid  #f55f5f';
          } else {
            if(start == tday.getDate() && ((options.month - 1) == tday.getMonth())) {
              t.style.border = '1px solid rgb(226, 224, 105)';
            }
          }
        }
        
      }
    })
  }

  tickHost(element: HTMLDivElement): HTMLDivElement {
    let d = document.createElement('div');
    d.classList.add('tick-host');
    d.setAttribute('style', `
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    flex-flow: row wrap;
    `) 

    let tickHost = element.getElementsByClassName('tick-host');
    if(tickHost.length > 0) {
      tickHost[0].replaceWith(d);
    } else {
      element.append(d);
    }
    return d;
  }
  
  private tickCard(options: {day: {num: number, name: string}, element: HTMLDivElement}): HTMLDivElement {
    let d = document.createElement('div');
    let numText = document.createTextNode(String(options.day.num));
    let nameText = document.createTextNode(options.day.name);

    d.append(this.span(numText, "18px"));
    d.append(this.span(nameText, "10px"));
    options.element.append(d);
    d.classList.add('tick');
    d.setAttribute('style',`
    background-color: white;
    box-shadow:1px 1px 5px rgb(199, 197, 196);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 6px;
    `)
    return d;
  }

private span(txtNode: any, fontSize: string): HTMLSpanElement {
  let s = document.createElement('span');
  s.appendChild(txtNode);
  s.setAttribute('style', `
  font-size: ${fontSize};
  padding: 0;
  `)
  return s;
}

  async getMonthTicksFor(paymentTicks: PaymentTicksModel, options: {year: number, month: number}): Promise<ITickResponse> {

    return new Promise((resolve, reject) => {
      if(paymentTicks) {
        let yrTick: YearlyTicksModel[];
        // this try catch method is used because when filter is called on undefined object, it'll throw exception
        try  {
          yrTick = paymentTicks.yearlyTicks.filter( t => t.id == options.year);
        } catch(e) {
          yrTick = [];
        }
        if(yrTick.length > 0) {
          let monthTick: MonthlyTicksModel[];
          try {
            monthTick = yrTick[0].monthlyTicks.filter( t => t.id == (options.month - 1));
          } catch(e) {
            monthTick = []
          }
          if(monthTick.length > 0) {
            return resolve({status: 1, result: monthTick[0], msg: "Success"});
          } else {
            return resolve({status: 0, msg: "No ticks found for the month provided"});
          }
        } else {
          return resolve({status: 0, msg: "No ticks found for the year provided"});
        }
      } else {
        return resolve({status: 0, msg: "Something went wrong"});
      }
    })

  }
}
