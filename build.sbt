name := """whoami"""
organization := "ihgs"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test
libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play-slick" % "4.0.2",
  "com.typesafe.play" %% "play-slick-evolutions" % "4.0.2",
  "com.h2database" % "h2" % "1.4.199",
  "org.slf4j" % "slf4j-nop" % "1.6.4"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "ihgs.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "ihgs.binders._"
EclipseKeys.preTasks := Seq(compile in Compile, compile in Test)