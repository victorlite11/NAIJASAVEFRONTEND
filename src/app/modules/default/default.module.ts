import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { MenuModule } from 'primeng/menu';

import { DefaultComponent } from './default.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import  { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";

import { environment } from "../../../environments/environment.prod";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddcontributorComponent } from 'src/app/modules/default/components/addcontributor/addcontributor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { ContributorComponent } from './components/contributor/contributor.component';
import { DepositorsComponent } from './components/subordinates/depositors.component';
import { HomeComponent } from './components/home/home.component';
import { InteraccountComponent } from './components/interaccount/interaccount.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { PriviledgeComponent } from './components/priviledge/priviledge.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubordinateComponent } from './components/subordinate/subordinate.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { WithdrawSavingsComponent } from './components/withdraw-savings/withdraw-savings.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SubordinatesPortalComponent } from './components/subordinates-portal/subordinates-portal.component';
import { SearchPortalComponent } from './components/search-portal/search-portal.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { IdentityComponent } from './components/identity/identity.component';
import { AddSubordinatesPortalComponent } from './components/add-subordinates-portal/add-subordinates-portal.component';
import { ChatsPortalComponent } from './components/chats-portal/chats-portal.component';
import { ChatsComponent } from './components/chats/chats.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CommissionComponent } from './components/commission/commission.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DepositorsComponent,
    ContributorComponent,
    TermsandconditionsComponent,
    PriviledgeComponent,
    ChatsComponent,
    CommissionComponent,
    ChatsPortalComponent,
    AddcontributorComponent,
    SettingsComponent,
    AnnouncementComponent,
    HomeComponent,
    PersonalDataComponent,
    InteraccountComponent,
    SubordinateComponent,
    ReferralsComponent,
    PersonalDataComponent,
    TermsandconditionsComponent,
    AddcontributorComponent,
    WithdrawSavingsComponent,
    RequestsComponent,
    SubordinatesPortalComponent,
    SearchPortalComponent,
    TransactionHistoryComponent,
    ActivitiesComponent,
    IdentityComponent,
    AddSubordinatesPortalComponent,
    PasswordResetComponent,
    SetNewPasswordComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MatRadioModule,
    FormsModule,
    //MenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule,
    MatChipsModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ]
})
export class DefaultModule { }
