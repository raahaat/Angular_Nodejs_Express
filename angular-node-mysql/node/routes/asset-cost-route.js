const express = require('express');
const promotionController = require('../controllers/promotion-cf-controller');
const proposeTransferController = require('../controllers/propose-transfer-controller');
const assetCostSetupController = require('../controllers/asset-cost-setup-controller');
const assetDependSetupController = require('../controllers/asset-depend-setup-controller');
const assetCostMultipController = require('../controllers/asset-cost-multip-controller');


const router = express.Router();



router.get('/emplist', promotionController.getEmployeeList);
router.get('/department-list', proposeTransferController.getDepartment);
router.get('/division-list', promotionController.getDivision);
router.get('/designation-list', promotionController.getDesignation);
router.get('/branch-list', promotionController.getBranch);

// ------------Cost Multiplication router----------------
router.get('/asset-cost-multip/get',assetCostMultipController.getAssetCostMultip);
router.post('/cost-multip/submit',assetCostMultipController.addCostMultip);
router.get('/cost-list',assetCostMultipController.getAssetCostList);
router.get('/cost-multip/single-entry/:id', assetCostMultipController.getSingleCostMultipData);
router.put('/cost-multip/update/:id', assetCostMultipController.updateCostMultip);
router.delete('/cost-multip/delete/:id',assetCostMultipController.deleteAssetCostMultip);
// ------------------End-----------------------

router.post('/asset-cost/submit', assetCostSetupController.addAssetCost);
router.post('/asset-depend/submit', assetDependSetupController.addAssetDepend);
router.get('/asset-main/get', assetDependSetupController.getAssetdepend);
router.put('/asset-mastr/update/:id', assetDependSetupController.updateAssetMaster);
router.delete('/asset-depend/delete/:id', assetDependSetupController.deleteAssetDepend)

router.get('/asset-cost/get',assetCostSetupController.getAssetCost);
router.delete('/asset-cost/delete/:id', assetCostSetupController.deleteAssetCost)
router.put('/asset-cost/update/:id', assetCostSetupController.updateAssetCost);
router.get('/asset-cost/single-entry/:id',assetCostSetupController.getSingleAssetCostData);


module.exports = router;