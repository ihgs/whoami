package controllers

import javax.inject._
import play.api._
import play.api.db._
import play.api.mvc._
import dao.AccountDao
import models.Account
import play.api.data.Form
import play.api.data.Forms.{mapping, text}
import play.api.libs.concurrent.Execution.Implicits.defaultContext

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(accountDao: AccountDao, cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action.async { 
    accountDao.all().map {
      users => Ok(views.html.index(users))
    }
  }
  
  def insertUser = Action.async { implicit request =>
    val user: Account = accountForm.bindFromRequest.get
    accountDao.insert(user).map(_ => Redirect(routes.HomeController.index))
  }
  
  var accountForm = Form(
      mapping(
          "uuid" -> text(),
          "username" -> text(),
          "email" -> text()
      )(Account.apply)(Account.unapply)
  )
}
