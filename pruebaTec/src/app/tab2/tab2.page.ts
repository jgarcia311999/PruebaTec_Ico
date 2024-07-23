import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  value: string | undefined;
  data1: any;
  data2: any;
  data3: any;
  options: any;
  stateOptions: any[] = [{ label: 'Grafica', value: 'Tabla' }, { label: 'Return', value: 'return' }];
  valueSelectButton: string = 'on';
  kmRecorridos: number | undefined;
  fecha: string | undefined;
  comentario: string | undefined;
  collapsed1: boolean = true;
  collapsed2: boolean = true;
  collapsed3: boolean = true;

  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = this.createData(documentStyle.getPropertyValue('--blue-500'));
    this.data2 = this.createData(documentStyle.getPropertyValue('--red-500'));
    this.data3 = this.createData(documentStyle.getPropertyValue('--green-500'));

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  createData(borderColor: string) {
    return {
      labels: [
        "01/06", "02/06", "03/06", "04/06", "05/06",
        "06/06", "07/06", "08/06", "09/06", "10/06",
        "11/06", "12/06", "13/06", "14/06", "15/06"
      ],
      datasets: [
        {
          label: "Jesús Garcia",
          data: [20, 35, 22, 19, 38, 30, 25, 27, 34, 21, 23, 29, 32, 28, 24],
          fill: false,
          borderColor: borderColor,
          tension: 0.4
        }
      ]
    };
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: file.name });
    }
  }

  agregarMarca() {
    if (!this.fecha || !this.kmRecorridos) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fecha y KM recorridos son obligatorios' });
      return;
    }

    this.updateData(this.data1);
    this.updateData(this.data2);
    this.updateData(this.data3);

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos actualizados' });

    // Marcar los cambios para detectar
    this.cdr.detectChanges();
    console.log('Datos actualizados:', this.data1, this.data2, this.data3);
  }

  updateData(data: any) {
    // Agregar nueva fecha si no existe
    if (!data.labels.includes(this.fecha)) {
      data.labels.push(this.fecha);
    }

    // Buscar índice de la fecha en las etiquetas
    const index = data.labels.indexOf(this.fecha);

    // Si existe un valor en esa fecha, actualizarlo, si no, agregarlo
    if (data.datasets[0].data[index] !== undefined) {
      data.datasets[0].data[index] = this.kmRecorridos;
    } else {
      // Rellenar datos faltantes con null
      for (let i = data.datasets[0].data.length; i < index; i++) {
        data.datasets[0].data[i] = null;
      }
      data.datasets[0].data[index] = this.kmRecorridos;
    }
  }

  toggleCard(cardNumber: number) {
    switch (cardNumber) {
      case 1:
        this.collapsed1 = !this.collapsed1;
        break;
      case 2:
        this.collapsed2 = !this.collapsed2;
        break;
      case 3:
        this.collapsed3 = !this.collapsed3;
        break;
    }
    this.cdr.detectChanges();
  }
}