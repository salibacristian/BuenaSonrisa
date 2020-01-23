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


import { AngularFireModule } from '@angular/fire';
import {firebaseConfig} from "../environments/environment";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CsvExporterComponent } from './components/csv-exporter/csv-exporter.component';
import { PdfExporterComponent } from './components/pdf-exporter/pdf-exporter.component';
import {DialogOverviewExampleDialog} from './components/calendar/calendar.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MinutePipe } from './pipes/minute.pipe';
import { FilterSchedulerPipe } from './pipes/filter-scheduler.pipe';


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
    AppointmentComponent,
    CalendarComponent,
    MinutePipe,
    FilterSchedulerPipe      
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    // }),
    BrowserAnimationsModule,
    NgbModule, 
    MatTabsModule,MatIconModule,MatCardModule
    ,MatButtonModule,MatProgressSpinnerModule
    ,MatInputModule,MatFormFieldModule,MatSelectModule,MatToolbarModule
    ,MatDatepickerModule, // provides moment date adapter
    MatMomentDateModule, MatDialogModule,MatListModule
    // AngularFontAwesomeModule,FontAwesomeModule
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: DateAdapter, useClass: MomentUtcDateAdapter },],
  bootstrap: [AppComponent]
})
export class AppModule { }
