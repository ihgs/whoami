package dao

import javax.inject.Inject
import models.Account
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{Future, ExecutionContext}
import play.api.libs.concurrent.Execution.Implicits.defaultContext


class AccountDao @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends HasDatabaseConfigProvider[JdbcProfile]{
  import profile.api._
  
  private val Accounts = TableQuery[AccountsTable]
  
  def all(): Future[Seq[Account]] = db.run(Accounts.result)  
  def insert(account: Account): Future[Unit] = db.run(Accounts += account).map { _=>()}

  private class AccountsTable(tag: Tag) extends Table[Account](tag, "Account"){
    
    def uuid = column[String]("uuid", O.PrimaryKey)
    def username = column[String]("username",O.Unique)
    def email = column[String]("email", O.Unique)
    
    def * = (uuid, username, email) <> (Account.tupled, Account.unapply _)
  }
}