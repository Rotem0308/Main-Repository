import { Component, OnInit } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { BannerService } from '../../core/services/banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.scss',
})
export class AdminInfoComponent implements OnInit {
  admin: IUser | null = null;
  onEdit: boolean = false;
  isLoading: boolean = false;
  editFormSub!: Subscription;
  adminSub!: Subscription;
  constructor(
    private userService: UserService,
    private bannerService: BannerService
  ) {}
  ngOnDestroy(): void {
    this.adminSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.adminSub = this.userService.user$.subscribe({
      next: (userObj) => {
        this.admin = userObj;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleEdit() {
    this.onEdit = !this.onEdit;
  }

  handleEditForm(form: any) {
    this.isLoading = true;
    this.editFormSub = this.userService.editInfo(form).subscribe({
      next: (admin) => {
        this.isLoading = false;
        this.userService.onSuccessfullUpdate(admin);
        this.handleEdit();
        console.log(admin);
      },
      error: (err) => {
        this.isLoading = false;
        this.bannerService.open({
          message: err.error.message,
          status: 'error',
        });
      },
    });
  }
}
