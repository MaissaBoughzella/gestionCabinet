import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConsultationService } from 'src/app/shared/api-consultation.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ApiRdvService } from 'src/app/shared/api-rdv.service';
import { ApiPatientService } from 'src/app/shared/api-patient.service';
import { ApiMedicamentService } from 'src/app/shared/api-medicament.service';
import { ApiOrdonnanceService } from 'src/app/shared/api-ordonnance.service';
import { ApiPrescriptionService } from 'src/app/shared/api-prescription.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {
  medecin: any;
  patient: any;
  medicaments: any;
  consultation: any;
  isAddContext: boolean = false;
  addOrdonnanceForm: FormGroup;
  addPrescriptionForm: FormGroup;
  prescriptions: any;
  isAddPresContext: boolean = false;
  selectedpres: any;
  medicamentId: any;
  medName: any;
  isEditPresContext: boolean = false;
  selectedmedicament: any;
  selectedMedId: any;
  editedId: any;
  ordId: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private apiConsService: ApiConsultationService, private apiAuthService: ApiAuthService,
    private apiRdvService: ApiRdvService, private apiPatientService: ApiPatientService,
    private apiMedicamentService: ApiMedicamentService, private apiOrdService: ApiOrdonnanceService,
    private apiPrescriptionService: ApiPrescriptionService) {

    this.addPrescriptionForm = new FormGroup({
      medicament: new FormControl(''),
      dosage: new FormControl(''),
      quantite: new FormControl(''),
      forme: new FormControl('')
    });

  }

  ngOnInit(): void {

    const idCons = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiOrdService.getOrdonnanceByConsultationId(idCons).subscribe((res: any) => {
      this.ordId = res.id;
      if (this.ordId != undefined && this.ordId != null) {
        this.isAddContext = true;
      }
      else this.isAddContext = false;
    });
    this.apiConsService.getConsById(idCons).subscribe((res: any) => {
      this.consultation = res;
      this.apiRdvService.getRdvById(res.rdv.substring(10)).subscribe((res: any) => {
        this.apiPatientService.getPatientById(res.patient.substring(14)).subscribe((res: any) => {
          this.apiAuthService.getUserById(res.user.substring(11)).subscribe((res: any) => {
            this.patient = res;
          });
        });
      });
    });

    const idMed = localStorage.getItem('userId').substring(11);
    this.apiAuthService.getUserById(idMed).subscribe((res: any) => {
      this.medecin = res;
    });

    this.apiMedicamentService.getMedicaments().subscribe((res: any) => {
      this.medicaments = res['hydra:member'];
    });
    this.apiOrdService.getOrdonnanceByConsultationId(idCons).subscribe((res: any) => {
      this.ordId = res.id;
      this.apiPrescriptionService.getPrescriptionByOrdId(this.ordId).subscribe((res: any) => {
        this.prescriptions = res['hydra:member'];
      });
    });

  }

  ajouterOrdonnance() {
    const idCons = this.activatedRoute.snapshot.paramMap.get('id');
    let dat = this.consultation.date;
    var body = {
      consultation: '/api/consultations/' + idCons,
      date: dat
    }
    this.apiOrdService.addOrdonnance(body).subscribe((res: any) => {
      this.isAddContext = true;
      this.ordId = res.id;
    });
  }

  ajouterPrescription() {
    const idCons = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiOrdService.getOrdonnanceByConsultationId(idCons).subscribe((res: any) => {
      this.ordId = res.id;
      this.addPrescriptionForm.addControl('ordonnance', new FormControl('/api/ordonnances/' + this.ordId));
      this.apiPrescriptionService.addPrescription(this.addPrescriptionForm.value).subscribe((res: any) => {
        this.isAddPresContext = false;
        document.getElementById("addPresButton").style.visibility = "visible";
        this.apiPrescriptionService.getPrescriptionByOrdId(this.ordId).subscribe((res: any) => {
          this.prescriptions = res['hydra:member'];
        });
      });
    });
  }

  setAddPresContext() {
    this.isAddPresContext = true;
    document.getElementById("addPresButton").style.visibility = "hidden";
  }

  setAnnulerAddPresContext() {
    this.isAddPresContext = false;
    document.getElementById("addPresButton").style.visibility = "visible"
  }

  deleteprescription(id) {
    this.apiPrescriptionService.deletePrescription(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedPresc(pres) {
    if (this.isEditPresContext == false) {
      this.isEditPresContext = true;
      this.editedId = pres?.id;
    }
    this.selectedpres = pres;
    this.medicamentId = pres.medicament.substring(17);
    this.apiMedicamentService.getMedicamentById(this.medicamentId).subscribe((res: any) => {
      this.selectedmedicament = res;
    });
  }

  setMedicament(med) {
    this.selectedMedId = med['@id'];
    this.selectedmedicament = med;
  }

  isEditContextPres(id): boolean {
    var isDiv: boolean;
    if (id == this.editedId)
      isDiv = true;
    else
      isDiv = false;
    return isDiv && this.isEditPresContext;

  }

  editPrescription(forme1, dosage1, qte1) {
    var form = {
      forme: forme1,
      dosage: dosage1,
      quantite: Number(qte1),
      medicament: this.selectedMedId,
    };
    const idCons = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiPrescriptionService.editPrescription(this.editedId, form).subscribe((res: any) => {
      this.isEditPresContext = false;
      this.apiOrdService.getOrdonnanceByConsultationId(idCons).subscribe((res: any) => {
        this.ordId = res.id;
        this.apiPrescriptionService.getPrescriptionByOrdId(this.ordId).subscribe((res: any) => {
          this.prescriptions = res['hydra:member'];
        });
      });
    });
  }

  setAnnulerEditPresContext() {
    this.isEditPresContext = false;
  }

  getNameMed(medId) {
    let id = medId.substring(17);
    this.apiMedicamentService.getMedicamentById(id).subscribe((res: any) => {
      return res.nom;
    });
  }
}

