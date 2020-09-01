import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAnalyseService } from 'src/app/shared/api-analyse.service';
import { ApiRadioService } from 'src/app/shared/api-radio.service';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiOrdonnanceService } from 'src/app/shared/api-ordonnance.service';
import { ApiPrescriptionService } from 'src/app/shared/api-prescription.service';
import { ApiMedicamentService } from 'src/app/shared/api-medicament.service';
import { ApiMedecinService } from 'src/app/shared/api-medecin.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ordonnance-patient',
  templateUrl: './ordonnance-patient.component.html',
  styleUrls: ['./ordonnance-patient.component.css']
})
export class OrdonnancePatientComponent implements OnInit {

  ordId: any;
  consultation: any;
  patient: any;
  medicaments: any;
  prescriptions: any;
  medecin: any;
  med = [];
  tab = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private apiConsService: ApiConsultationService, private apiAuthService: ApiAuthService,
    private apiRdvService: ApiRdvService, private apiMedicamentService: ApiMedicamentService, private apiOrdService: ApiOrdonnanceService,
    private apiPrescriptionService: ApiPrescriptionService, private apiMedecinService: ApiMedecinService) { }

  ngOnInit(): void {
    this.med = [];
    this.tab = [];
    let idCons = this.activatedRoute.snapshot.paramMap.get('id');
    let idPatient = localStorage.getItem('userId').substring(11);
    this.apiConsService.getConsById(idCons).subscribe((res: any) => {
      this.consultation = res;
      this.apiRdvService.getRdvById(res.rdv.substring(10)).subscribe((res: any) => {
        this.apiMedecinService.getMedecinById(res.medecin.substring(14)).subscribe((res: any) => {
          this.apiAuthService.getUserById(res.user.substring(11)).subscribe((res: any) => {
            this.medecin = res;
          });
        });
      });
    });
    this.apiAuthService.getUserById(idPatient).subscribe((res: any) => {
      this.patient = res;
    });
    this.apiMedicamentService.getMedicaments().subscribe((res: any) => {
      this.medicaments = res['hydra:member'];
    });

    this.apiOrdService.getOrdonnanceByConsultationId(idCons).subscribe((res: any) => {
      this.ordId = res.id;
      this.apiPrescriptionService.getPrescriptionByOrdId(this.ordId).subscribe((res: any) => {
        this.prescriptions = res['hydra:member'];
        for (let j = 0; j < this.prescriptions.length; j++) {
          this.tab.push(this.prescriptions[j].medicament.substring(17));
        }
        for (let i = 0; i < this.tab.length; i++) {
          this.apiMedicamentService.getMedicamentById(this.tab[i]).subscribe((res: any) => {
            this.med.push(res.nom);
          });
        }
      });
    });
  }

  public htmlToPdf() {
    var data = document.getElementById('contentToConvert');  //Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('ordonnance.pdf'); // Generated PDF   
    });
  }
}
