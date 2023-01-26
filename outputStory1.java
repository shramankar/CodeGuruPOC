/*
Description

As a super admin, I want to ‘login’ to application by entering the super admin account number and password successfully so that I can access the functionalities displayed on super admin landing page.

Acceptance Criteria:

·       Ability to login with valid credentials.

·       Ability to see name, profiles pic, last sing in details

·       Ability to access super admin landing  page and welcome screen with the following

o   Dashboard (quick links)

o   Management (Management links)

o   Setup (Setup links)

o   Profile (Profile links)

o   Logout

·       Ability to click the functionalities displayed on screen with the following

o   Dashboard (quick links)

§  Add product

§  Products

§  Manage Stocks

§  Specials Offers

§  Orders

§  New order

§  Import Stock

§  Add buyer

§  Viewer

o   Management (Management links)

§  Product

§  Specials Offers

§  Manage Stock

§  Orders

§  New order

§  viewers

§  Return Claim

§  Import stock

§  Export History

o   Setup (Setup links)

§  Administrator

§  Buyer

§  Group Buyers

§  Retailers

§  Block/Unlock titles

§  Product categories

§  Documents

§  Slides

§  So event calendar

§  Assign privileges

§  Site configuration

o   Profile (Profile links)

§  My profile

§  Change password

·       The user can create and delete other users within the system.

·       The user can assign and revoke different levels of access and permissions for other users.

·       The user can access and manage all data within the system, regardless of other users' permissions.
*/

@Controller
public class SuperAdminController {
 
    @RequestMapping(value="/superadmin/login", method=RequestMethod.POST)
    public String login(@RequestParam("accountNumber") String accountNumber,
                        @RequestParam("password") String password){
        if(isValidAccountNumberAndPassword(accountNumber, password)){
            return "superadmin/landing-page";
        }
        return "superadmin/login-error";
    }
 
    @RequestMapping(value="/superadmin/dashboard", method=RequestMethod.GET)
    public String dashboard(){
        return "superadmin/dashboard";
    }
 
    @RequestMapping(value="/superadmin/management", method=RequestMethod.GET)
    public String management(){
        return "superadmin/management";
    }
 
    @RequestMapping(value="/superadmin/setup", method=RequestMethod.GET)
    public String setup(){
        return "superadmin/setup";
    }
 
    @RequestMapping(value="/superadmin/profile", method=RequestMethod.GET)
    public String profile(){
        return "superadmin/profile";
    }
 
    @RequestMapping(value="/superadmin/logout", method=RequestMethod.GET)
    public String logout(){
        return "superadmin/logout";
    }
 
    @RequestMapping(value="/superadmin/create-user", method=RequestMethod.POST)
    public String createUser(@RequestParam("username") String username,
                        @RequestParam("password") String password){
        if(createUser(username, password)){
            return "superadmin/user-created";
        }
        return "superadmin/create-user-error";
    }
 
    @RequestMapping(value="/superadmin/delete-user", method=RequestMethod.POST)
    public String deleteUser(@RequestParam("username") String username){
        if(deleteUser(username)){
            return "superadmin/user-deleted";
        }
        return "superadmin/delete-user-error";
    }
 
    @RequestMapping(value="/superadmin/assign-access", method=RequestMethod.POST)
    public String assignAccess(@RequestParam("username") String username,
                        @RequestParam("access") String access){
        if(assignAccess(username, access)){
            return "superadmin/access-assigned";
        }
        return "superadmin/assign-access-error";
    }
 
    @RequestMapping(value="/superadmin/revoke-access", method=RequestMethod.POST)
    public String revokeAccess(@RequestParam("username") String username){
        if(revokeAccess(username)){
            return "superadmin/access-revoked";
        }
        return "superadmin/revoke-access-error";
    }
 
    @RequestMapping(value="/superadmin/manage-data", method=RequestMethod.GET)
    public String manageData(){
        return "superadmin/manage-data";
    }
}

