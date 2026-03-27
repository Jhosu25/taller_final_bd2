import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  charts: SafeResourceUrl[] = [];

  selectedFilter: string = 'cases';
  searchTerm: string = '';

  constructor(private sanitizer: DomSanitizer) {
    this.updateCharts();
  }

  // 🔄 CAMBIAR FILTRO
  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.updateCharts();
  }

  // 🔍 BUSCADOR
  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.updateCharts();
  }

  // 🧩 GENERAR URL DINÁMICA
  updateCharts() {

    const base = 'https://charts.mongodb.com/charts-taller_final-pvdtswx/embed/charts?id=';

    let chartIds: any = {
      cases: [
        'c70eb502-7036-4a11-8165-b74784951bfd',
        '2120cc8b-5dc7-4967-a044-36bdf905a187'
      ],
      deaths: [
        '26db2ab3-bdb8-4f89-83f6-ba1eb32cf96a'
      ],
      vacc: [
        'TU_CHART_VACUNACION'
      ]
    };

    const selectedCharts = chartIds[this.selectedFilter];

    this.charts = selectedCharts.map((id: string) => {

      let url = `${base}${id}&theme=light&autoRefresh=true`;

      // 👉 FILTRO POR PAÍS (si escribes algo)
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        url += `&filter={"country":"${this.searchTerm}"}`;
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}