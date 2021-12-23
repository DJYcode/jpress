package io.jpress.addon.topic;

import io.jpress.codegen.AddonGenerator;

public class Codegen {

    private static String dbUrl = "jdbc:mysql://sh-cynosdbmysql-grp-leubbkhq.sql.tencentcdb.com:20690/jpress";
    private static String dbUser = "root";
    private static String dbPassword = "JUNyang521@txy";

    private static String addonName = "addon-friend-link";
    private static String dbTables = "friend_link";
    private static String modelPackage = "io.jpress.addon.friendlink.model";
    private static String servicePackage = "io.jpress.addon.friendlink.service";


    public static void main(String[] args) {

        AddonGenerator moduleGenerator = new AddonGenerator(addonName, dbUrl, dbUser, dbPassword, dbTables, modelPackage, servicePackage);
        moduleGenerator.setGenUI(true);
        moduleGenerator.gen();

    }

}
