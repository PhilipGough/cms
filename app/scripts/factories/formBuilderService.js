/**
 * This Service simply maintains a list of options regarding
 * CSS which are used to populate dropdown menus and were found in the
 * CSS from the system we are writing to as per this assignment
 */
'use strict';
angular.module('CMS')

.factory('formBuilder', function() {
  var formHelper = {};

  formHelper.hoverCssOptions = function() {
    return {
        'Grey': 'rl_hover_grey',
        'Straw': 'rl_hover_straw',
        'Lime': 'rl_hover_lime',
        'Light Blue': 'rl_hover_light_blue'
      };
  };

  formHelper.borderCssOptions = function() {
    return {
        'Dotted': 'rl_brd_dotted',
        'Dashed':'rl_brd_dashed',
        'Solid':'rl_brd_solid',
        'Double':'rl_brd_double',
        'Groove':'rl_brd_groove',
        'Ridge':'rl_brd_ridge',
        'Inset':'rl_brd_inset',
        'Outset':'rl_brd_outset',
        'None':'rl_brd_none',
        'Hidden':'rl_brd_hidden',
        'Mixed':'rl_brd_mix'

    };
  };

  formHelper.borderColorOptions = function() {
    return {
        'Red': 'rl_brd_clr_red',
        'Black':'rl_brd_clr_black',
        'Blue':'rl_brd_clr_blue',
        'Green':'rl_brd_clr_green',
        'White':'rl_brd_clr_white'
    };
  };

  formHelper.backgroundColorOptions = function() {
    return {
        'Blue': 'rl_bkg_color_blue',
        'Light Blue': 'rl_bkg_color_blue1',
        'Yellow':'rl_bkg_color_yellow',
        'Red':'rl_bkg_color_red',
        'Black':'rl_bkg_color_clr_black',
        'Green':'rl_bkg_color_green',
        'Olive':'rl_bkg_color_olive',
        'Mauve':'rl_bkg_color_mauve',
        'Orange':'rl_bkg_color_orange',
        'White':'rl_bkg_color_white',
        'Lime': 'rl_bkg_color_item1'
    };
  };

  formHelper.borderRadius = function() {
    return {
      'Radius 15':'rl_rcorners15',
      'Radius 20':'rl_rcorners20',
      'Radius 25':'rl_rcorners25',
      'Radius 30':'rl_rcorners30',
    };
  };

  formHelper.fontSize = function() {
    return {
     '2.5': 'rl_font_2_5',
     '2.0': 'rl_font_2_0',
     '1.8': 'rl_font_1_8',
     '1.5': 'rl_font_1_5',
     '1.2':'rl_font_1_2'
   };

  };

  return formHelper;
});
