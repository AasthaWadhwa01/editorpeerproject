import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
// import { RouterTestingModule } from '@angular/router/testing';
import {  Router} from '@angular/router';
import { HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import { MatTabsModule} from '@angular/material';
import { MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { MockBackend,MockConnection} from '@angular/http/testing';
import 'rxjs/add/observable/of';

import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/profile.service';
import { ReactiveFormsModule, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { config} from '../../config/profileConfig';
import { NavbarComponent} from '../navbar/navbar.component';
import { FooterComponent} from '../footer/footer.component';

describe('ProfileComponent', () => {
 let component: ProfileComponent;
 let fixture: ComponentFixture<ProfileComponent>;
 let doprofile,detitle:DebugElement;
 let eoprofile,eltitle:HTMLElement;
 let spy,service,data;
	let userid:{res:{data:"userId"}};
	let profileService: ProfileService;

beforeEach(async(() => {
	TestBed.configureTestingModule({
		 declarations: [ ProfileComponent, NavbarComponent , FooterComponent],  
	 imports : [FormsModule, MatTabsModule,MatButtonModule, HttpModule, ReactiveFormsModule,BrowserAnimationsModule],
		 providers : [  {provide: ProfileService },{provide: ProfileComponent},  {provide: Router},{ provide: XHRBackend, useClass: MockBackend }]
	 })
	 .compileComponents();

}));

beforeEach(() => {
		/*data = test.response;*/
		TestBed.configureTestingModule({
		 }).compileComponents();
		 fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
	 service = fixture.debugElement.injector.get(ProfileService );
	})

//positive test for component whether created or not
it('should be created', () => {
	 expect(component).toBeTruthy();
 });

//negative test for component whether created or not
	it('should not create the profile component', () => {
		expect(component).not.toBeFalsy();
	});

/*Positive Testcase to check whether displaydata to return firstname*/
	it('displayData method should return firstName.',
		inject([ProfileComponent, XHRBackend], (profile, mockBackend) => {
			const mockResponse = { firstName: 'abc' };
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse)
				})));
			});
			component.displayData("abc")
			expect(mockResponse.firstName).toEqual('abc');
		}));

/*Negative Testcase to check whether displaydata to return firstname*/
	it('displayData method should not return firstName',
		inject([ProfileComponent, XHRBackend], (chathome, mockBackend) => {
			const mockResponse = { firstName: 'abc'  };
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse)
				})));
			});
			component.displayData("cde")
			expect(mockResponse.firstName).not.toEqual('cde ');
		}));
});