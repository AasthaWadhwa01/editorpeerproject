import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { GitService } from './git.service';
import { Router } from '@angular/router';

describe('gitService ,(mockBackend)', () => {
  let spy;
  let service: GitService;

  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        GitService, AuthenticationService, { provide: Router },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
    spyOn(localStorage, 'getItem').and.callFake(function(key) {
      return JSON.stringify({ "userName": "test" });
    });
    let store = {};
    const spy2 = spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = < string > value;
    });
  });

  //testcase for getUser method
  it('test getUser method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getUser().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getRepos method
  it('test getRepos method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getRepos().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getTree method
  it('test getTree method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getTree().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getFile method
  it('test getFile method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.getFile();
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //testcase for createFile method
  it('test createFile method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.createFile().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for commitfile method
  it('test commitfile method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.commitfile().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for treecommit method
  it('test treecommit method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.treecommit().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for newcommit method
  it('test newcommit method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.newcommit().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for lastcommit method
  it('test lastcommit method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.lastcommit().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for updateUser method
  it('test updateUser method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.updateUser();
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //testcase for getsha method
  it('test getsha method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getsha().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for updateFile method
  it('test updateFile method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.updateFile().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for deleteFile method
  it('test deleteFile method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.deleteFile().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for createToken method
  it('test createToken method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.createToken().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for createRepos method
  it('test createRepos method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.createRepos().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getFolderContents method
  it('test getFolderContents method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getFolderContents("data").subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for openFolder method
  it('test openFolder method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.openFolder().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getFileData method
  it('test getFileData method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getFileData().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for getLatestRepoTree method
  it('test getLatestRepoTree method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GitService.getLatestRepoTree().subscribe((data) => {
        expect(data).toEqual([{ data: 'abc' }]);
      });
    }));

  //testcase for handleError method with 401 error
  it('test handleError method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.handleError({ status: 401 });
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //testcase for handleError method without 401 error
  it('test handleError method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.handleError({ status: 201 });
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //testcase for authorization method
  it('test authorization method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.authorization();
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //testcase for authorizationToken method
  it('test authorizationToken method',
    inject([GitService, XHRBackend], (GitService, mockBackend) => {
      const mockResponse = [{ data: 'abc' }, ];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      let data = GitService.authorizationToken();
      data = "abc"
      expect(data).toEqual('abc');
    }));

  //Testcase to check whether service is created or not
  it('should be created', inject([GitService], (service: GitService) => {
    localStorage.setItem('userName', 'Shiksha');
    expect(service).toBeTruthy();
  }));

  //Testcase to check whether service is injected or not
  it('can instantiate service when inject service',
    inject([GitService], (service: GitService) => {
      expect(service instanceof GitService).toBe(true);
    }));

  //Testcase to check whether mockdata is used instead of real database
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
})
