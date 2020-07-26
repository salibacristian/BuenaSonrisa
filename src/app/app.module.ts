import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {firebaseConfig} from "../environments/environment";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CsvExporterComponent } from './components/csv-exporter/csv-exporter.component';
import { PdfExporterComponent } from './components/pdf-exporter/pdf-exporter.component';
import {DialogOverviewExampleDialog} from './components/calendar/calendar.component';
import {AddSpecialtyDialog} from './components/home/home.component';
import {UserSpecialtiesDialog} from './components/home/home.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MinutePipe } from './pipes/minute.pipe';
import { FilterSchedulerPipe } from './pipes/filter-scheduler.pipe';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AvailabilityComponent } from './components/availability/availability.component';
import { UsersComponent } from './components/users/users.component';
import { UserStatusPipe } from './pipes/user-status.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FilterBySpecialtyPipe } from './pipes/filter-by-specialty.pipe';
import { DatePipe } from './pipes/date.pipe';
import { AppointmentStatusPipe } from './pipes/appointment-status.pipe';

import { RecaptchaModule } from 'ng-recaptcha';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ReviewComponent } from './components/review/review.component';
import { SurveyComponent } from './components/survey/survey.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { GenderPipe } from './pipes/gender.pipe';
import { DisabledDirective } from './directives/disabled.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    CsvExporterComponent,
    PdfExporterComponent,
    DialogOverviewExampleDialog,
    AddSpecialtyDialog,
    UserSpecialtiesDialog,
    AppointmentComponent,
    CalendarComponent,
    MinutePipe,
    FilterSchedulerPipe,
    AppointmentsListComponent,
    UploadImageComponent,
    AvailabilityComponent,
    UsersComponent,
    UserStatusPipe,
    UserTypePipe,
    ConfirmDialogComponent,
    FilterBySpecialtyPipe,
    DatePipe,
    AppointmentStatusPipe,
    ChartComponent,
    ReviewComponent,
    SurveyComponent,
    UserCardComponent,
    GenderPipe,
    DisabledDirective
    ],
  entryComponents: [DialogOverviewExampleDialog, AddSpecialtyDialog, UserSpecialtiesDialog, ConfirmDialogComponent, ReviewComponent, SurveyComponent, UserCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    // }),
    BrowserAnimationsModule,
    NgbModule, 
    MatTabsModule,MatIconModule,MatCardModule
    , MatButtonModule,MatProgressSpinnerModule
    , MatInputModule, MatFormFieldModule, MatSelectModule, MatToolbarModule
    , MatDatepickerModule // provides moment date adapter
    , MatMomentDateModule, MatDialogModule,MatListModule,MatTableModule
    , MatCheckboxModule, MatSlideToggleModule, MatPaginatorModule, MatTooltipModule
    , MatMenuModule, MatSliderModule
    // AngularFontAwesomeModule,FontAwesomeModule
    , RecaptchaModule, HighchartsChartModule
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: DateAdapter, useClass: MomentUtcDateAdapter },],
  bootstrap: [AppComponent]
})
export class AppModule { }
