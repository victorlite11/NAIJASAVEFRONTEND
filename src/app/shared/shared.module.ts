import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DepositComponent } from '../modules/default/components/deposit/deposit.component';
import { WithdrawComponent } from './dialogs/withdraw/withdraw.component';
import { DepositrequestsComponent } from './components/depositrequests/depositrequests.component';
import { WithdrawalrequestsComponent } from './components/withdrawalrequests/withdrawalrequests.component';
import { environment } from "../../environments/environment.prod";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChangeDailyDepositComponent } from './dialogs/change-daily-deposit/change-daily-deposit.component';
import { TransactionSlipComponent } from './dialogs/transaction-slip/transaction-slip.component';
import { AuthService } from './services/auth/auth.service';
import { AnnouncementCardComponent } from './cards/announcement-card/announcement-card.component';
import { ErrorComponent } from './components/error/error.component';
import { SubordinateCardComponent } from './cards/subordinate-card/subordinate-card.component';
import { ProfileHeaderComponent } from './components/headers/profile-header/profile-header.component';
import { BalanceHeaderComponent } from './components/headers/balance-header/balance-header.component';
import { CountsHeaderComponent } from './components/headers/counts-header/counts-header.component';
import { TransactionHeaderComponent } from './components/headers/transaction-header/transaction-header.component';
import { TransactionHistoryCardComponent } from './cards/transaction-history-card/transaction-history-card.component';
import { SearchComponent } from './dialogs/search/search.component';
import { ChatHeaderComponent } from './components/headers/chat-header/chat-header.component';
import { ChatsCardComponent } from './cards/chats-card/chats-card.component';
import { AlertComponent } from './dialogs/alert/alert.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { ProxyInterceptor } from './interceptors/proxy/proxy.interceptor';
@NgModule({
  providers: [
    AuthService,
    {provide: 'AUTH_KEY_PROPERTY_NAME', useValue: "axQt4qRzh6aox3Wa"},
    {provide: 'SEARCH_SELECTION_KEY', useValue: "Bxrt5qRzm6x3za"},
    {provide: 'CONTRIBUTORS_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/contributors"},
    {provide: 'SUBORDINATES_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/subordinates"},
    {provide: 'ANNOUNCEMENTS_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/announcements"},
    {provide: 'PAYMENT_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/payment"},
    {provide: 'PRIVILEGE_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/privilege"},
    {provide: 'IDENTITY_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/identity"},
    {provide: 'PASSWORD_RESET_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/password-reset"},
    {provide: 'REFERRAL_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/referral"},
    {provide: 'ACTIVITIES_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/activities"},
    {provide: 'TRANSACTION_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/transactions"},
    {provide: 'CHATS_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/chats"},
    {provide: 'INVITATION_LINK', useValue: "https://www.naija-save.com.ng/#/access/signup?invitation_code="},
    {provide: 'SEARCH_SUBORDINATES_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/search/subordinates"},
    {provide: 'SEARCH_CONTRIBUTORS_UNIFIED_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/search/contributors_unified_search"},
    {provide: 'AUTH_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/auth/login"},
    {provide: 'DEPOSIT_REQUEST_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/requests/deposit-requests"},
    {provide: 'REQUEST_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/requests"},
    {provide: 'SIGNUP_REQUEST_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/requests/signup-requests"},
    {provide: 'WITHDRAWAL_REQUEST_ENDPOINT', useValue: "https://naijasave-endpoint.vercel.app/requests/withdrawal-requests"},
    {provide : HTTP_INTERCEPTORS, useClass : ProxyInterceptor, multi : true}
  ],
  
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DepositComponent,
    WithdrawComponent,
    DepositrequestsComponent,
    DepositrequestsComponent,
    WithdrawalrequestsComponent,
    AnnouncementCardComponent,
    ChangeDailyDepositComponent,
    TransactionSlipComponent,
    ErrorComponent,
    ChatHeaderComponent,
    ChatsCardComponent,
    SubordinateCardComponent,
    ProfileHeaderComponent,
    BalanceHeaderComponent,
    CountsHeaderComponent,
    TransactionHeaderComponent,
    TransactionHistoryCardComponent,
    SearchComponent,
    AlertComponent,
    ComingSoonComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  exports: [
    MatMenuModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DepositrequestsComponent,
    WithdrawalrequestsComponent,
    AnnouncementCardComponent,
    ErrorComponent,
    SubordinateCardComponent,
    ChatsCardComponent,
    ChatHeaderComponent,
    ProfileHeaderComponent,
    BalanceHeaderComponent,
    CountsHeaderComponent,
    TransactionHeaderComponent,
    TransactionHistoryCardComponent,
    AlertComponent,
    BottomSheetComponent
  ]
})
export class SharedModule { }
