import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-agenda',
  templateUrl: './gestion-agenda.page.html',
  styleUrls: ['./gestion-agenda.page.css']
})
export class GestionAgendaPage {
  ngOnInit()
  {
    this.loadJsFile();
  }
  
  public loadJsFile()
  {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
