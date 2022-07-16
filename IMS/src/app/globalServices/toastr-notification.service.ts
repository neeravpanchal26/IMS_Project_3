import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ToastrNotificationService {
    // Default Constructor
    constructor(private toast: ToastrService) {
    }

    // Error message
    handleError(error: Error) {
        return this.toast.error('An error has occurred\n' + error.message + '\nPlease contact the administrator for further assistance.', 'Oops!');
    }
    qrCodeScanError() {
        return this.toast.error('An error occurred while scanning your code.\nPlease try again.','Oops')
    }

    // Deactivated user component notifications here
    activatedSuccess(user) {
        return this.toast.success(user + "'s status has been activated!", "Success!");
    }

    deactivatedSuccess(user) {
        return this.toast.warning(user + "'s status has been deactivated!", "Success!");
    }

    userRoleChange(user) {
        return this.toast.success(user + "'s role has been changed!", "Success!");
    }

    // It password reset component notifications here
    passwordResetSuccess(firstname, surname) {
        return this.toast.success('Password has been reset for ' + firstname + ' ' + surname + '.', 'Success!')
    }

    // Login component notifications here
    loginSuccess(username) {
        return this.toast.success("Welcome " + username, 'Success!');
    }
u
    loginFailure() {
        return this.toast.warning('Change a few things up and try submitting again.', 'Failure!');
    }

    loginDeactivated(username) {
        return this.toast.error(username + ' Please contact the administrator. Your account has been deactivated.', 'Failure!');
    }

    // Add user component notification here
    addUserSuccess(firstname, surname) {
        return this.toast.success(firstname + ' ' + surname + ' has been added to the system. User is currently deactivated.', 'Success!');
    }

    formFailure() {
        return this.toast.warning('Your form is invalid.', 'Warning!');
    }

    // Business Setting component notification here
    businessUpdateSuccess() {
        return this.toast.success('Your business information has been updated', 'Success!');
    }

    // User Setting component notifications here
    userSettingUpdateSuccess(firstName, surname) {
        return this.toast.success(firstName + ' ' + surname + ' your personal information has been updated.', 'Success!');
    }

    // User password reset component notification here
    userPasswordResetSuccess() {
        return this.toast.success('Your password has been updated.', 'Success!');
    }

    allocationSuccess(equipmentID, userID) {
        return this.toast.success('Equipment ID ' + equipmentID + ' has successfully been allocated to user ' + userID + '.');
    }

    //Adding of equipment
    addEquipmentSuccess(name) {
        return this.toast.success('The equipment named ' + name + ' has successfully been added.');
    }

    //Update of equipment
    updateEquipmentSuccess() {
        return this.toast.success('Update successful');
    }
    noChange()
    {
        return this.toast.warning('Nothing got updated.');
    }

    //Manage Equipment
    equipmentActivateSuccess(equipment) {
        return this.toast.success(equipment + ' has been activated', 'Success');
    }

    equipmentDeactivateSuccess(equipment) {
        return this.toast.success(equipment + ' has been deactivated', 'Success');
    }
    //Install Equipment
    geolocationTurnedOff()
    {
        return this.toast.error('Location turned off. Turn it on and reload page to use Map.');
    }
    geolocationUnavailablePosition()
    {
        return this.toast.error('Position Unavailable.');
    }
    geolocationBrowserNotSupportive()
    {
        return this.toast.error('Browser not supported.');
    }
    geolocationSeviceTimeOut()
    {
        return this.toast.error('Service timed out. Try again later.');
    }
    installationSuccessful()
    {
        return this.toast.success('Installation successful.');
    }
    // Secondary components
    addCitySuccess() {
        return this.toast.success('Your city has been added.','Success');
    }
    addSuburbSuccess() {
        return this.toast.success('Your suburb has been added.','Success');
    }
    addConditionSuccess() {
        return this.toast.success('Your condition has been added','Success');
    }
    addBrandSuccess() {
        return this.toast.success('Your brand has been added','Success');
    }
    addTypeSuccess() {
        return this.toast.success('Your type has been added','Success');
    }
    addSectionSuccess() {
        return this.toast.success('Your section has been added','Success');
    }
    addSupplierSuccess() {
        return this.toast.success('Your supplier has been added','Success');
    }
    // Inspection components notifications here.
    inspectionSuccess() {
        return this.toast.success('Your inspection was successful.','Success');
    }
    maintenanceSuccess() {
        return this.toast.success('Your maintenance was successful.','Success');
    }
    equipmentNotFound() {
        return this.toast.warning('This equipment is not available.','Warning');
    }
}
