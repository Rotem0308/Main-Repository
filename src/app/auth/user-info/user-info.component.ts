import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';
import { BannerService } from '../../core/services/banner.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  onEdit: boolean = false;
  isLoading: boolean = false;
  editFormSub!: Subscription;
  userSub!: Subscription;
  constructor(
    private userService: UserService,
    private bannerService: BannerService
  ) {}
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.userService.user$.subscribe({
      next: (userObj) => {
        this.user = userObj;
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
      next: (user) => {
        this.isLoading = false;
        this.userService.onSuccessfullUpdate(user);
        this.handleEdit();
        console.log(user);
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
