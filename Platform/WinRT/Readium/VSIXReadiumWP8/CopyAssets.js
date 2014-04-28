/*
 *  CopyAssets.js
 *
 *  Created by Diego Sandin on 2014-01-22.
 *  Copyright (c) 2012-2014 The Readium Foundation and contributors.
 *  
 *  The Readium SDK is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var fso = new ActiveXObject("Scripting.FileSystemObject");
var srcRoot = fso.GetFolder("..\\Readium").Path;
var deployRoot = fso.GetFolder("..\\").Path;
var rootFolder = fso.GetFolder(".\\").Path;

var configurations =
    [
        ["Debug",   "Debug"],
        ["Release", "Retail"]
    ]

var architecturesPhoneSupportInterfaces =
    [
        ["ARM", "arm"],
        ["Win32", "x86"]
    ]

var architecturesReadiumWP8 =
    [
        ["ARM", "arm"],
        ["Win32", "x86"]
    ]

var architecturesPhoneSupport =
    [
        ["ARM", "arm"],
        ["x86", "x86"]
    ]

var assetsPhoneSupport =
[
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupport\\ReadiumPhoneSupport.pdb", "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupport\\ReadiumPhoneSupport.dll", "Redist\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupport\\ReadiumPhoneSupport.dll", "References\\CONFIGURATION\\ARCHITECTURE\\"]
]

var assetsPhoneSupportInterfaces =
[ 
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.pdb", "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.exp", "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.lib", "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.dll", "Redist\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.winmd", "References\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\PhoneSupportInterfaces\\PhoneSupportInterfaces.xml", "References\\CONFIGURATION\\ARCHITECTURE\\"]
]

var assetsReadiumWP8 = 
[
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.pdb",    "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.exp",    "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.lib",    "DesignTime\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.dll",   "Redist\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.winmd", "References\\CONFIGURATION\\ARCHITECTURE\\"],
    ["\\deploy\\ARCHITECTURE\\CONFIGURATION\\ReadiumWP8\\Readium.xml",   "References\\CONFIGURATION\\ARCHITECTURE\\"]
]

/* Copy  Include files */
var includeDir = "DesignTime\\CommonConfiguration\\Neutral\\Include";
WScript.Echo("Copying 'Public Interface' to '" + includeDir + "'");

var path = fso.BuildPath(srcRoot, "\\*.h");
try {
    WScript.Echo("path: '" + path + "'");
    
    if (!fso.FolderExists(rootFolder + "\\" + includeDir)) {
        var pathElements = includeDir.split("\\");
        var currentPath = rootFolder;
        for (var l in pathElements) {
            currentPath = currentPath + "\\" + pathElements[l];
            if (!fso.FolderExists(currentPath)) {
                WScript.Echo("Folder Doesn't Exists: '" + currentPath + "'");
                fso.CreateFolder(currentPath);
            }
        }
    }

    fso.CopyFile(path, includeDir, true);
} catch (e) {
    WScript.Echo("Error: '" + e.description + "'  '" + e.message + "'");
}

for (var i in configurations) {

    for (var j in architecturesPhoneSupport) {
        WScript.Echo("Copying PhoneSupport '" + configurations[i][0] + "' files of '" + architecturesPhoneSupport[j][0] + "' architeture ");
        for (var k in assetsPhoneSupport) {

            var inPath = fso.BuildPath(deployRoot, assetsPhoneSupport[k][0].replace("ARCHITECTURE", architecturesPhoneSupport[j][0]).replace("CONFIGURATION", configurations[i][0]));
            var outPath = assetsPhoneSupport[k][1].replace("ARCHITECTURE", architecturesPhoneSupport[j][1]).replace("CONFIGURATION", configurations[i][1]);

            WScript.Echo("Copying '" + inPath + "' to '" + outPath + "'");

            if (!fso.FolderExists(rootFolder + "\\" + outPath)) {
                var pathElements = outPath.split("\\");
                var currentPath = rootFolder;
                for (var l in pathElements) {
                    currentPath = currentPath + "\\" + pathElements[l];
                    if (!fso.FolderExists(currentPath)) {
                        WScript.Echo("Folder Doesn't Exists: '" + currentPath + "'");
                        fso.CreateFolder(currentPath);
                    }
                }
            }

            try {
                fso.CopyFile(inPath, outPath, true);
            } catch (e) {
                WScript.Echo("Error: '" + e.description + "'");
            }
        }
    }

    for (var j in architecturesPhoneSupportInterfaces) {
        WScript.Echo("Copying PhoneSupportInterfaces '" + configurations[i][0] + "' files of '" + architecturesPhoneSupportInterfaces[j][0] + "' architeture ");
        for (var k in assetsPhoneSupportInterfaces) {

            var inPath = fso.BuildPath(deployRoot, assetsPhoneSupportInterfaces[k][0].replace("ARCHITECTURE", architecturesPhoneSupportInterfaces[j][0]).replace("CONFIGURATION", configurations[i][0]));
            var outPath = assetsPhoneSupportInterfaces[k][1].replace("ARCHITECTURE", architecturesPhoneSupportInterfaces[j][1]).replace("CONFIGURATION", configurations[i][1]);

            WScript.Echo("Copying '" + inPath + "' to '" + outPath + "'");

            if (!fso.FolderExists(rootFolder + "\\" + outPath)) {
                var pathElements = outPath.split("\\");
                var currentPath = rootFolder;
                for (var l in pathElements) {
                    currentPath = currentPath + "\\" + pathElements[l];
                    if (!fso.FolderExists(currentPath)) {
                        WScript.Echo("Folder Doesn't Exists: '" + currentPath + "'");
                        fso.CreateFolder(currentPath);
                    }
                }
            }

            try {
                fso.CopyFile(inPath, outPath, true);
            } catch (e) {
                WScript.Echo("Error: '" + e.description + "'");
            }
        }
    }

    for (var j in architecturesReadiumWP8) {
        WScript.Echo("Copying ReadiumWP8 '" + configurations[i][0] + "' files of '" + architecturesReadiumWP8[j][0] + "' architeture ");
        for (var k in assetsReadiumWP8) {
            var inPath = fso.BuildPath(deployRoot, assetsReadiumWP8[k][0].replace("ARCHITECTURE", architecturesReadiumWP8[j][0]).replace("CONFIGURATION", configurations[i][0]));
            var outPath = assetsReadiumWP8[k][1].replace("ARCHITECTURE", architecturesReadiumWP8[j][1]).replace("CONFIGURATION", configurations[i][1]);

            WScript.Echo("Copying '" + inPath + "' to '" + outPath + "'");

            if (!fso.FolderExists(rootFolder + "\\" + outPath)) {
                var pathElements = outPath.split("\\");
                var currentPath = rootFolder;
                for (var l in pathElements) {
                    currentPath = currentPath + "\\" + pathElements[l];
                    if (!fso.FolderExists(currentPath)) {
                        WScript.Echo("Folder Doesn't Exists: '" + currentPath + "'");
                        fso.CreateFolder(currentPath);
                    }
                }
            }

            try {
                fso.CopyFile(inPath, outPath, true);
            } catch (e) {
                WScript.Echo("Error: '" + e.description + "'");
            }
        }
    }
}