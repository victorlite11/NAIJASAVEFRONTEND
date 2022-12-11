import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './modules/access/access.component';
import { SigninComponent } from './modules/access/components/signin/signin.component';
import { SignupSuccessComponent } from './modules/access/components/signup-success/signup-success.component';
import { SignupComponent } from './modules/access/components/signup/signup.component';
import { AddcontributorComponent } from './modules/default/components/addcontributor/addcontributor.component';
import { AnnouncementComponent } from './modules/default/components/announcement/announcement.component';
import { ContributorComponent } from './modules/default/components/contributor/contributor.component';
import { DepositorsComponent } from './modules/default/components/subordinates/depositors.component';
import { HomeComponent } from './modules/default/components/home/home.component';
import { InteraccountComponent } from './modules/default/components/interaccount/interaccount.component';
import { PersonalDataComponent } from './modules/default/components/personal-data/personal-data.component';
import { PriviledgeComponent } from './modules/default/components/priviledge/priviledge.component';
import { ReferralsComponent } from './modules/default/components/referrals/referrals.component';
import { SubordinateComponent } from './modules/default/components/subordinate/subordinate.component';
import { TermsandconditionsComponent } from './modules/default/components/termsandconditions/termsandconditions.component';
import { DefaultComponent } from './modules/default/default.component';

import { DepositrequestsComponent } from './shared/components/depositrequests/depositrequests.component';
import { WithdrawalrequestsComponent } from './shared/components/withdrawalrequests/withdrawalrequests.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in/logged-in.guard';
import { WithdrawSavingsComponent } from './modules/default/components/withdraw-savings/withdraw-savings.component';
import { RequestsComponent } from './modules/default/components/requests/requests.component';
import { SubordinatesPortalComponent } from './modules/default/components/subordinates-portal/subordinates-portal.component';
import { SearchPortalComponent } from './modules/default/components/search-portal/search-portal.component';
import { TransactionHistoryComponent } from './modules/default/components/transaction-history/transaction-history.component';
import { ActivitiesComponent } from './modules/default/components/activities/activities.component';
import { IdentityComponent } from './modules/default/components/identity/identity.component';
import { AddSubordinatesPortalComponent } from './modules/default/components/add-subordinates-portal/add-subordinates-portal.component';
import { ChatsComponent } from './modules/default/components/chats/chats.component';
import { ChatsPortalComponent } from './modules/default/components/chats-portal/chats-portal.component';
import { PasswordResetComponent } from './modules/default/components/password-reset/password-reset.component';
import { HasResetPasswordVerificationCodeGuard } from './shared/guards/has-reset-password-verification-code/has-reset-password-verification-code.guard';
import { SetNewPasswordComponent } from './modules/default/components/set-new-password/set-new-password.component';
import { AboutUsComponent } from './modules/default/components/about-us/about-us.component';
import { ContactUsComponent } from './modules/default/components/contact-us/contact-us.component';
import { DepositComponent } from './modules/default/components/deposit/deposit.component';
import { CommissionComponent } from './modules/default/components/commission/commission.component';
import { ComingSoonComponent } from './shared/components/coming-soon/coming-soon.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {path: 'home',component: HomeComponent},
      {path: 'about-us', component : AboutUsComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'password-reset',component: PasswordResetComponent},
      {
        path : "set-new-password",
        canActivate : [HasResetPasswordVerificationCodeGuard],
        component : SetNewPasswordComponent
      },
      {
        path: '',
        component: ContributorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications', 
        component: AnnouncementComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'interaccount', 
        component: InteraccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'daily-savings-commission', 
        component: CommissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinates', 
        component: DepositorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'depositrequests', 
        component: DepositrequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'withdrawalrequests', 
        component: WithdrawalrequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'coming-soon', 
        component: ComingSoonComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'privilege', 
        component: PriviledgeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'new-contributor', 
        component: AddcontributorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'referral', 
        component: ReferralsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinate', 
        component: SubordinateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'withdraw-savings', 
        component: WithdrawSavingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'personal-data', 
        component: PersonalDataComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'requests', 
        component: RequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chats', 
        component: ChatsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chats-portal', 
        component: ChatsPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinates-portal', 
        component: SubordinatesPortalComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'deposit', 
        component: DepositComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search-portal', 
        component: SearchPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'transactions', 
        component: TransactionHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'activities', 
        component: ActivitiesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'assign-subordinates', 
        component: AddSubordinatesPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'identity', 
        component: IdentityComponent,
        canActivate: [AuthGuard]
      },
      {path: 'termsandconditions', component: TermsandconditionsComponent}
    ]
  },
  {
    path: 'access',
    component: AccessComponent,
    children: [
      {
        path: '', 
        component: SigninComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'signup', 
        component: SignupComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'approval', 
        component: SignupSuccessComponent,
        canActivate: [LoggedInGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
